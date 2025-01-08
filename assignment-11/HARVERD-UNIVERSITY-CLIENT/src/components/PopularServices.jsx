
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import ServiceCard from "./ServiceCard";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "./Loading";
import AOS from 'aos';
import 'aos/dist/aos.css';


const PopularServices = () => {
  const { isDark } = useContext(AuthContext);  // Assuming dark mode state is in AuthContext
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });  // Initialize AOS with a duration of 1000ms
    fetchAllServices();
  }, []);

  const fetchAllServices = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/services`);
      setServices(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={`p-6 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div>
        <h1 className="text-3xl md:text-5xl font-bold text-center" data-aos="fade-up">
          Popular Services
        </h1>
        <p className="text-lg mt-2 text-center" data-aos="fade-up" data-aos-delay="200">
          This is Our popular service if you're interested in booking now
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 my-10 md:grid-cols-2 lg:grid-cols-3 mx-auto">
        {services.slice(0, 6).map((service, index) => (
          <div key={service._id} data-aos="fade-up" data-aos-delay={index * 100}>
            <ServiceCard service={service} />
          </div>
        ))}
      </div>

      <div className="text-center mt-10" data-aos="fade-up" data-aos-delay="500">
        <Link to="/all-services">
          <button className="p-4 text-white specialGradient hover:bg-blue-600 rounded-lg">
            Show All Services
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopularServices;
