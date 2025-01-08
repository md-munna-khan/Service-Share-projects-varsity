import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../components/ErrorPage";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import AddService from "../pages/AddService";
import ManageServices from "../pages/ManageServices";

import ServiceToDo from "../pages/ServiceToDo";
import AllServices from "../pages/AllServices";
import PrivateRoute from "./PrivateRoute";
import ServiceDetails from "../components/ServiceDetails";
import BookNow from "../components/BookNow";
import UpdateService from "../components/UpdateService";
import MyBookedServices from "../pages/MyBookedServices";



const router = createBrowserRouter([
{
    path:'/',
    element:<MainLayout></MainLayout>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
        {
            index:true,
            element:<Home></Home>
        },
        {
            path: '/login',
            element: <Login />,
          },
          {
            path: '/registration',
            element: <Register />,
          },
          {
            path:'/add-service',
            element:<PrivateRoute><AddService></AddService></PrivateRoute>,
          },
          {
            path:'/manage-services',
            element:<PrivateRoute><ManageServices></ManageServices></PrivateRoute>,
          },
          {
            path:'/booked-services',
            element:<PrivateRoute><MyBookedServices></MyBookedServices></PrivateRoute>,
          },
          {
            path:'/service-to-do',
            element:<PrivateRoute><ServiceToDo></ServiceToDo></PrivateRoute>,
          },
          {
            path:'/all-services',
            element:<AllServices></AllServices>,
          },
          {
            path:'/service-details/:id',
            element:<PrivateRoute><ServiceDetails></ServiceDetails></PrivateRoute>,
          },
          {
            path:'/book-now/:id',
            element:<BookNow></BookNow>,
          },
          {
            path:'/update/:id',
            element:<UpdateService></UpdateService>,
          },
          
        
          
    ]
}
])
export default router