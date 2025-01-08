import DatePicker from "react-datepicker";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";

const BookNow = () => {
    const axiosSecure = useAxiosSecure();
    const { user, isDark } = useContext(AuthContext);
    const navigate = useNavigate();
    const [service, setService] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [loading, setLoading] = useState(true); // Loading state
    const { id } = useParams();

    // Fetch service data on component mount or when `id` changes
    useEffect(() => {
        fetchJobData();
    }, [id]);

    const fetchJobData = async () => {
        try {
            const { data } = await axiosSecure.get(`/service/${id}`);
            setService(data);
            setLoading(false); // Stop loading once data is fetched
        } catch (error) {
            setLoading(false);
            toast.error("Error fetching service data.");
        }
    };

    const {
        image,
        title,
        _id,
        buyer: { email: providerEmail, name: providerName, photo: providerPhoto } = {},
        area,
        service_price,
        description,
    } = service || {};

    // Handle form submission
    const handleBidSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const comment = form.comment.value;

        // Validate if the user is the provider
        if (providerEmail === user?.email) {
            return toast.error("You cannot book your own service.");
        }

        const bookData = {
            price: service_price,
            comment,
            serviceId: id,
            serviceName: title,
            serviceImage: image,
            providerEmail: providerEmail,
            providerName: providerName,
            currentUserEmail: user?.email,
            currentUserName: user?.displayName,
            serviceTakingDate: startDate,
            description: description,
            area: area,
            status: "pending",
        };

        try {
            // Place the booking request
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/add-book`, bookData);
            form.reset();
            toast.success("Booking placed successfully!");
            navigate('/booked-services');
        } catch (err) {
            toast.error(err?.response?.data || "Something went wrong while placing the booking.");
        }
    };

    // Loading state: render a spinner while fetching service data
    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="spinner"></div> {/* Add a spinner component or a loading animation */}
            </div>
        );
    }

    return (
        <div className={`p-6 w-full rounded-md my-10 shadow-md md:min-h-[350px] ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}>
            <h2 className={`font-semibold text-center text-2xl lg:text-4xl capitalize ${isDark ? 'text-white' : 'text-gray-700'}`}>
                Place A Booking
            </h2>
            <form onSubmit={handleBidSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="md:col-span-1">
                    <label className={`${isDark ? 'text-white' : 'text-gray-700'}`} htmlFor="serviceImage">Service Image</label>
                    <img src={image} alt={title} className="block w-full h-auto mt-2 rounded-md" />
                </div>
                <div>
                    <div>
                        <label className={`${isDark ? 'text-white' : 'text-gray-700'}`} htmlFor="serviceId">Service ID</label>
                        <input
                            id="serviceId"
                            type="text"
                            name="serviceId"
                            value={id}
                            readOnly
                            className={`block w-full px-4 py-2 mt-2 ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'text-gray-700 border-black'} rounded-md border`}
                        />
                    </div>

                    <div>
                        <label className={`${isDark ? 'text-white' : 'text-gray-700'}`} htmlFor="serviceName">Service Name</label>
                        <input
                            id="serviceName"
                            type="text"
                            name="serviceName"
                            value={title}
                            readOnly
                            className={`block w-full px-4 py-2 mt-2 ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-black'} rounded-md border`}
                        />
                    </div>

                    <div>
                        <label className={`${isDark ? 'text-white' : 'text-gray-700'}`} htmlFor="providerEmail">Provider Email</label>
                        <input
                            id="providerEmail"
                            type="text"
                            name="providerEmail"
                            value={providerEmail}
                            readOnly
                            className={`block w-full px-4 py-2 mt-2 ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-black'} rounded-md border`}
                        />
                    </div>

                    <div>
                        <label className={`${isDark ? 'text-white' : 'text-gray-700'}`} htmlFor="providerName">Provider Name</label>
                        <input
                            id="providerName"
                            type="text"
                            name="providerName"
                            value={providerName}
                            readOnly
                            className={`block w-full px-4 py-2 mt-2 ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-black'} rounded-md border`}
                        />
                    </div>

                    <div>
                        <label className={`${isDark ? 'text-white' : 'text-gray-700'}`} htmlFor="currentUserEmail">Current User Email</label>
                        <input
                            id="currentUserEmail"
                            type="text"
                            name="currentUserEmail"
                            value={user?.email}
                            readOnly
                            className={`block w-full px-4 py-2 mt-2 ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-black'} rounded-md border`}
                        />
                    </div>

                    <div>
                        <label className={`${isDark ? 'text-white' : 'text-gray-700'}`} htmlFor="currentUserName">Current User Name</label>
                        <input
                            id="currentUserName"
                            type="text"
                            name="currentUserName"
                            value={user?.displayName}
                            readOnly
                            className={`block w-full px-4 py-2 mt-2 ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-black'} rounded-md border`}
                        />
                    </div>

                    <div>
                        <label className={`${isDark ? 'text-white' : 'text-gray-700'}`} htmlFor="servicePrice">Service Price</label>
                        <input
                            id="servicePrice"
                            type="text"
                            name="servicePrice"
                            value={service_price}
                            readOnly
                            className={`block w-full px-4 py-2 mt-2 ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-black'} rounded-md border`}
                        />
                    </div>

                    <div>
                        <label className={`${isDark ? 'text-white' : 'text-gray-700'}`} htmlFor="serviceTakingDate">Service Taking Date</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className={`block w-full px-4 py-2 mt-2 ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-black'} rounded-md border`}
                            dateFormat="MMMM d, yyyy"
                            minDate={new Date()}
                        />
                    </div>

                    <div className="col-span-2">
                        <label className={`${isDark ? 'text-white' : 'text-gray-700'}`} htmlFor="comment">Special Instruction</label>
                        <textarea
                            id="comment"
                            name="comment"
                            rows="4"
                            required
                            className={`block w-full px-4 py-2 mt-2 ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-black'} rounded-md border`}
                        ></textarea>
                    </div>

                    <div className="flex items-center justify-center mt-6 md:col-span-2">
                        <button
                            type="submit"
                            className={`px-6 py-3 text-sm font-medium leading-5 text-center text-white capitalize transition-colors duration-300 transform ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-700 hover:bg-gray-800'} rounded-lg focus:outline-none border-black focus:ring-opacity-50`}
                        >
                            Place Booking
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BookNow;
