

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DynamicTitle = () => {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        let title = 'Abroad University';
        if (path === '/') {
            title = "Home / Abroad University";
        } else if (path === '/login') {
            title = 'Login /Abroad University';
        } else if (path === '/register') {
            title = "Register / Abroad University";
        } else if (path === '/all-services') {
            title = 'All-Services/Abroad University';
        } else if (path === '/manage-services') {
            title = "Manage-Services/Abroad University ";
        } else if (path === '/booked-services') {
            title = "Booked-Services/Abroad University ";
        }else if(path=== '/service-to-do'){
            title= 'service-To-Do/Abroad University'
        }else if(path=== '/add-service')[
            title='Add Services/Abroad University'
        ]
       
        
        document.title = title;
    }, [location.pathname]);

    return null;
};

export default DynamicTitle;