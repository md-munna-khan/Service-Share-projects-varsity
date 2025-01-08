import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


const MainLayout = () => {
    return (
        <div className=" container mx-auto my-10">
        <nav>
            <Navbar></Navbar>
        </nav>
        <div className='min-h-[calc(100vh-306px)]'>
        <Outlet />
      </div>
          <footer>
            <Footer></Footer>
          </footer>
        </div>
    );
};

export default MainLayout;