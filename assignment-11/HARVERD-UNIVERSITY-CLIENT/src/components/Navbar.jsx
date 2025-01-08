




import { useContext, useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CiDark } from "react-icons/ci";
import { MdOutlineLightMode, MdOutlineMenuOpen } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import harvardLogo from '../assets/harvard.png';
import { AuthContext } from '../providers/AuthProvider';

const Navbar = () => {
  const { user, logOut, isDark, setIsDark } = useContext(AuthContext);
  const [dropDownShow, setDropDownOff] = useState(false);
  const [mobileMenuShow, setMobileMenuShow] = useState(false);
  
  const navbarRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleDarkModeToggle = () => {
    setIsDark(!isDark);
  };

  const handleDropDown = () => {
    setDropDownOff(!dropDownShow);
  };

  const handleMobileMenu = () => {
    setMobileMenuShow(!mobileMenuShow);
  };

  const handleClickOutside = (event) => {
    if (
      navbarRef.current && !navbarRef.current.contains(event.target) &&
      dropdownRef.current && !dropdownRef.current.contains(event.target)
    ) {
      setDropDownOff(false);
      setMobileMenuShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={navbarRef} className={`navbar bg-base-100 shadow-sm items-center container rounded-lg px-4 mx-auto${isDark ? ' bg-gray-800 text-white' : ''}`}>
      <div className='flex-1 flex items-center'>
        <Link to='/' className='flex gap-2 items-center'>
          <img className='w-auto h-7' src={harvardLogo} alt='Harvard Logo' />
          <span className='font-bold lg:text-2xl'>ABROAD <i className='bg-gradient-to-r from-red-500 to-red-700 text-transparent bg-clip-text'>UNIVERSITY</i></span>
        </Link>
      </div>
      <div className='flex-none flex items-center gap-4'>
        {/* Dark Mode Toggle */}
        <div onClick={handleDarkModeToggle} className="cursor-pointer text-3xl lg:text-5xl font-bold">
          {isDark ? <MdOutlineLightMode />  : <CiDark /> }
        </div>

        <ul className={`hidden top-[100px] md:flex menu menu-horizontal ${isDark ? 'text-white specialGradient rounded-lg' : 'text-white specialGradient rounded-lg'}`}>
          <li className='rounded'>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li className='rounded'>
            <NavLink to='/all-services'>All Services</NavLink>
          </li>
          {!user && (
            <li className='rounded'>
              <NavLink to='/login'>Login</NavLink>
            </li>
          )}
        </ul>

        <div className='relative'>
          <button onClick={handleMobileMenu} className='text-4xl lg:text-5xl sm:hidden md:block'>
            {mobileMenuShow ? <IoMdClose /> : <MdOutlineMenuOpen />}
          </button>
          {mobileMenuShow && (
            <ul ref={dropdownRef} className={`menu absolute menu-vertical  z-10 right-0 top-12 bg-base-100 text-white ${user ? 'specialGradient lg:w-52 ' : 'specialGradient lg:hidden'} shadow-lg   w-52  rounded ${isDark ? 'bg-gray-800 text-white' : ''}`}>
              <li className='rounded lg:hidden'>
                <Link to='/'>Home</Link>
              </li>
              <li className='rounded lg:hidden'>
                <Link to='/all-services'>All Services</Link>
              </li>
              {!user && (
                <li className='rounded lg:hidden'>
                  <Link to='/login'>Login</Link>
                </li>
              )}
              {user && (
                <ul>
                  <li>
                    <Link to='/add-service' className='justify-between'>
                      Add Service
                    </Link>
                  </li>
                  <li>
                    <Link to='/manage-services'>Manage Services</Link>
                  </li>
                  <li>
                    <Link to='/booked-services'>Booked Services</Link>
                  </li>
                  <li>
                    <Link to='/service-to-do'>Service To-Do</Link>
                  </li>
                  <li className='mt-2'>
                    <button onClick={logOut} className='block text-center w-full py-1 rounded-md'>
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </ul>
          )}
        </div>

        {user && (
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              onClick={handleDropDown}
              className='btn btn-ghost btn-circle avatar'
            >
              <div title={user?.displayName} className='rounded-full'>
                <img
                  referrerPolicy='no-referrer'
                  alt='User Profile Photo'
                  src={user?.photoURL}
                />
              </div>
            </div>
            {dropDownShow && (
              <ul
                ref={dropdownRef}
                tabIndex={0}
                className={`menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52 ${isDark ? 'bg-gray-800 text-white' : ''}`}
              >
                <li>
                  <span className='block text-center py-1'>Name: {user.displayName}</span>
                </li>
                {/* Uncomment the following block if email display and logout button are needed */}
                {/* <li>
                  <span className='block text-center py-1'>Email: {user.email}</span>
                </li>
                <li className='mt-2'>
                  <button onClick={logOut} className='block text-center w-full py-1 rounded-md'>
                    Logout
                  </button>
                </li> */}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;




