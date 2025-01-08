
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import DynamicTitle from "../components/DynamicTitle";
import Loading from "../components/Loading";

const AllServices = () => {
  const { isDark } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllServices();
  }, [search]);

  const fetchAllServices = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/services?search=${search}`);
      setServices(data);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
if(loading){
 
  return <Loading></Loading>
}
  return (
    <div className={`container mx-auto my-12 px-4 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      {/* Search Bar */}
      <DynamicTitle></DynamicTitle>
      <div className="w-full my-4 py-2 sm:w-[400px] mx-auto mb-6">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          name="search"
          placeholder="Search for services..."
          className={`input input-bordered w-full p-4 rounded-xl shadow-md transition-all hover:shadow-xl focus:outline-none ${isDark ? 'bg-gray-800 text-white border-white py-2' : 'bg-white text-black'}`}
          required
        />
      </div>

      <h1 className={`text-4xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-black'}`}>All Services ({services.length})</h1>
      <div className="flex flex-col gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className={`p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Service Image */}
              <div className="w-full flex justify-center md:col-span-3">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full lg:h-[500px] object-cover rounded-lg"
                />
              </div>

              {/* Service Details */}
              <div className="w-full md:w-2/3 flex flex-col justify-center md:col-span-2">
                <div className="flex-grow flex flex-col justify-center">
                  <h2 className={`text-2xl mt-4 md:mt-0 ${isDark ? 'text-white' : 'text-black'}`}> Title: {service.title}</h2>

                  <p className={`font-bold ${isDark ? 'text-white' : 'text-black'}`}> Description:</p>
                  <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {service.description.length > 100
                      ? `${service.description.substring(0, 100)}...`
                      : service.description}
                  </p>
                </div>

                <div className="flex items-center">
                  <img
                    src={service.buyer.photo}
                    alt={service.buyer.name}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  <div className="ml-3">
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>{service.buyer.name}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className={` ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Area: {service.area}</p>
                  <p className={` ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Price: ${service.service_price.toFixed(2)}</p>
                </div>

                <Link to={`/service-details/${service._id}`}>
                  <p className="mt-4 p-2  specialGradient text-white rounded-md hover:bg-blue-600 text-center">
                    View Detail
                  </p>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllServices;


