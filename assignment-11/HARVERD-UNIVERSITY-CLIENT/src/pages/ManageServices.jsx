


import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import DynamicTitle from "../components/DynamicTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading";

const ManageServices = () => {
  const axiosSecure = useAxiosSecure();
  const { user, isDark } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchAllServices();
  }, [user]);

  const fetchAllServices = async () => {
    try {
      const { data } = await axiosSecure.get(`/services/${user?.email}`);
      setServices(data);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  if(loading){
 
    return <Loading></Loading>
  }
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.delete(`/service/${id}`);
          toast.success("Deleted successfully");
          fetchAllServices();
          Swal.fire({
            title: "Deleted!",
            text: "Your service has been deleted.",
            icon: "success"
          });
        } catch (err) {
          console.log(err);
          toast.error(err.message);
        }
      }
    });
  };

  return (
    <div>
      <DynamicTitle></DynamicTitle>
      <section className={`container px-4 my-10 mx-auto pt-12 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-center lg:text-4xl">
            My Posted Services
          </h2>
          <span className={`px-3 py-1 text-xs rounded-full ${isDark ? 'text-blue-200 bg-blue-900' : 'text-blue-600 bg-blue-100'}`}>
            {services.length} service{services.length !== 1 && 's'}
          </span>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className={`overflow-hidden border ${isDark ? 'border-gray-700' : 'border-gray-200'} md:rounded-lg`}>
                <table className={`min-w-full divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  <thead className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <tr>
                      <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                        Image
                      </th>
                      <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                        Service Name
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                        Price
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                        Service Area
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                        Description
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`${isDark ? 'bg-gray-800' : 'bg-white'} divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                    {services.map((service) => (
                      <tr key={service._id}>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <img className="w-20 h-10 lg:h-20 rounded-full" src={service.image} alt="" />
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {service.title}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          ${service.service_price}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {service.area}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {service.description.substring(0, 70)}...
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
                            <button
                              onClick={() => handleDelete(service._id)}
                              className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                            <Link
                              to={`/update/${service._id}`}
                              className="text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManageServices;

