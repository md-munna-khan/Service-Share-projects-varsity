import { format } from "date-fns";

const ServiceRoDoTable= ({ book, handleStatusChange }) => {
    const {serviceImage,comment,   providerName,
        providerEmail, currentUserName,  currentUserEmail, serviceName,  area, serviceTakingDate,   price,  description, status, _id } = book || {};

    return (
        <tr>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                <img src={serviceImage} alt={ serviceName} className="w-10 h-10 object-cover" />
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
            {providerEmail}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
            {providerName}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
            {currentUserEmail}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
            {currentUserName}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
             {format(new Date(serviceTakingDate),'P')}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                { serviceName}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                ${  price}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
          {comment}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
            {description.substring(0, 30)}...
            </td>
            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div
               
                className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                    status === 'pending' && '  text-yellow-500'
                } ${status === 'working' && '  text-blue-500'} ${
                    status === 'completed' && '  text-green-500'
                } ${status === 'Rejected' && '  text-red-500'}`}
            >
                <span
                    className={`h-1.5 w-1.5 rounded-full ${
                        status === 'pending' && 'bg-yellow-500'
                    } ${status === 'working' && ' specialGradient'} ${
                        status === 'completed' && 'bg-green-500'
                    } ${status === 'Rejected' && 'bg-red-500'} `}
                ></span>
                
                 <select 
                    name='' 
                    id=""
                      className='border p-4 rounded-md'
                    value={status}
                   onChange={(e)=>handleStatusChange(_id,e.target.value)}
              
                    >

                        <option  value="pending">pending</option>
                        <option value="working">working</option>
                        <option value="completed">completed</option>
                    </select>
                    {/* <h2 className="text-sm font-normal ">{status}</h2> */}
                </div>
            </td>
        </tr>
    );
};



export default ServiceRoDoTable;

