


import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const ServiceCard = ({ service }) => {
  const { image, title, buyer, service_price, description, _id } = service || {};
  const { isDark } = useContext(AuthContext);

  return (
    <div
      className={`mx-auto rounded-lg border space-y-2 p-4 shadow-lg overflow-hidden grid gap-4 lg:grid-cols-5 md:grid-cols-2 grid-cols-1 ${isDark ? 'dark:bg-gray-800 dark:border-gray-600' : 'bg-white'}`}
    >
      <div className="lg:col-span-3 md:col-span-1 col-span-1">
        <img
          className="w-full h-64 lg:h-[400px] rounded-lg object-cover"
          src={image}
          alt={title}
        />
      </div>
      <div className="lg:col-span-2 md:col-span-1 col-span-1 flex flex-col justify-center">
        <div className={`font-bold  mb-2 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
          Title: {title}
        </div>
        <div>
          <p className={`text-base ${isDark ? 'text-white' : 'text-gray-700'}`}>
           <span className="font-bold"> Description:</span> {description?.substring(0, 100)}...
          </p>
        </div>
        <div>
          <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Price: ${service_price.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center mt-4">
          <img
            className="w-12 h-12 rounded-full border-2 border-blue-500 mr-4"
            src={buyer?.photo}
            alt={buyer?.name}
          />
          <div className="text-sm">
            <p className={`leading-none ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Name: {buyer?.name}
            </p>
          </div>
        </div>
        <div className="text-center mt-4">
          <Link to={`/service-details/${_id}`}>
            <button className=" specialGradient hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
              View Detail
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

