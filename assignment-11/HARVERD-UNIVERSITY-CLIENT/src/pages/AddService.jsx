



import toast from "react-hot-toast";
import { useContext} from "react";
import { AuthContext } from "../providers/AuthProvider";
import DynamicTitle from "../components/DynamicTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";


const AddService = () => {
  const axiosSecure = useAxiosSecure();
  const { user, isDark } = useContext(AuthContext);
const personalEmails= user?.email
console.log(personalEmails)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.service_title.value;
    const image = form.service_image.value;
    const area = form.service_area.value;
    const email = form.email.value;
    const service_price = parseFloat(form.service_price.value);
    const description = form.description.value;

    const formData = {
      image,
      title,
      buyer: {
        email,
        name: user?.displayName,
        photo: user?.photoURL,
      },
      area,
      service_price,
      description,
    };

    console.log(formData);

    try {
     const {data} = await axiosSecure.post(`/add-services?email=${personalEmails}`, formData);
      console.log(data)
      form.reset(); 
      if(data?.acknowledged){
        toast.success('Data Added Successfully!!!');
      }
    
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  

  return (
    <div className={`flex justify-center py-4 items-center min-h-[calc(100vh-306px)] my-12 ${isDark ? 'bg-gray-800 rounded-lg text-white' : ''}`}>
      <DynamicTitle />
      <section className='p-2 md:p-6 mx-auto bg-white dark:bg-gray-800 rounded-md shadow-md'>
        <h2 className='text-lg font-semibold text-gray-700 dark:text-white capitalize'>
          Post a Service
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 gap-6 mt-4 md:grid-cols-2'>
            <div>
              <label className='text-gray-700 dark:text-gray-300' htmlFor='service_image'>
                Image URL of the Service
              </label>
              <input
                id='service_image'
                name='service_image'
                type='text'
                placeholder="Image URL of the Service"
                className='block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring'
              />
            </div>
            <div>
              <label className='text-gray-700 dark:text-gray-300' htmlFor='service_title'>
                Service Title
              </label>
              <input
                id='service_title'
                name='service_title'
                type='text'
                placeholder="Service Title"
                className='block w-full px-4 py-2 mt-2 text-gray-700  bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring'
              />
            </div>
            <div>
              <label className='text-gray-700 ' htmlFor='emailAddress'>
                Email Address
              </label>
              <input
                id='emailAddress'
                type='email'
                name='email'
                defaultValue={user?.email}
                disabled={true}
                className='block w-full px-4 py-2 mt-2 text-gray-700  bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring'
              />
            </div>
            <div>
              <label className='text-gray-700 ' htmlFor='service_price'>
                Price
              </label>
              <input
                id='service_price'
                name='service_price'
                type='number'
                placeholder="Price"
                className='block w-full px-4 py-2 mt-2 text-gray-700  bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring'
              />
            </div>
            <div>
              <label className='text-gray-700 ' htmlFor='service_area'>
                Service Area
              </label>
              <input
                id='service_area'
                name='service_area'
                type='text'
                placeholder="Service Area"
                className='block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring'
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 mt-4'>
            <label className='text-gray-700 dark:text-gray-300' htmlFor='description'>
              Description
            </label>
            <textarea
              className='block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring'
              name='description'
              id='description'
            ></textarea>
          </div>
          <div className='flex justify-end mt-6'>
            <button className='disabled:cursor-not-allowed w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
              Add
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddService;
