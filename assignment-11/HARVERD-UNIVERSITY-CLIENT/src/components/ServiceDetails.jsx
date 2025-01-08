



import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import { AuthContext } from "../providers/AuthProvider";

const ServiceDetails = () => {
  const { isDark } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchAllServices();
  }, [id]);

  const fetchAllServices = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/service/${id}`);
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  if (!services) {
    return <Loading />;
  }

  const { image, title, buyer, area, service_price, description } = services || {};

  return (
    <>
      <h2 className={`my-4 text-3xl text-center lg:text-5xl ${isDark ? 'text-white' : 'text-black'}`}>
        Service Details Page
      </h2>
      <div className={`max-w-4xl mx-auto p-4 items-center justify-center my-10 rounded-lg shadow-md overflow-hidden lg:flex ${isDark ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <img className="w-full lg:w-1/2 object-cover" src={image} alt={title} />
        <div className="lg:ml-4 lg:flex lg:flex-col lg:justify-between">
          <div className="px-6 py-4">
            <div className="font-bold text-2xl mb-2">Tittle:{title}</div>
            <p className="text-base mb-4"><span className="font-bold">Description:</span>{description}</p>
            <div>
              <span className="font-bold">price: ${service_price}</span>
            </div>
            <Link to={`/book-now/${id}`}>
              <button className="specialGradient mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Book Now
              </button>
            </Link>
          </div>
          <div className="px-6 py-4 flex items-center border-t mt-4">
            <img className="w-10 h-10 rounded-full mr-4" src={buyer?.photo} alt={buyer?.name} />
            <div className="text-sm">
              <p className="leading-none">Name: {buyer?.name}</p>
              <p className="">Area: {area}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetails;
