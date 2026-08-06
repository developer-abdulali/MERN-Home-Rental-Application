import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../../public/assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

import { FaUser, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const adminURL = import.meta.env.VITE_ADMIN_URL;
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  const NavLinks = [
    { path: "/", label: "HOME" },
    { path: "/doctors", label: "ALL DOCTORS" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT" },
  ];

  return (
    <nav className="sticky top-0  bg-white z-50 flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-44 cursor-pointer"
      />
      <ul className="hidden md:flex items-center gap-5 font-medium">
        {NavLinks.map((item, i) => (
          <NavLink key={i} to={item.path}>
            <li className="py-2">{item.label}</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
        ))}

        <button
          onClick={() => window.open(adminURL, "_blank")}
          className="border rounded-2xl px-5 py-1"
        >
          Admin Panel
        </button>
      </ul>
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              src={userData?.image}
              alt="profile_pic"
              className="w-8 rounded-full"
            />
            <p className="hidden lg:block">{userData?.name}</p>
            <img
              src={assets.dropdown_icon}
              alt="dropdown icon"
              className="w-2.5"
            />

            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 flex flex-col gap-4 p-4">
                <p
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/my-profile");
                  }}
                  className="hover:text-black cursor-pointer flex items-center gap-2"
                >
                  <FaUser /> My Profile
                </p>
                <p
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/my-appointments");
                  }}
                  className="hover:text-black cursor-pointer flex items-center gap-2"
                >
                  <FaCalendarAlt /> My Appointments
                </p>
                <p
                  onClick={logout}
                  className="hover:text-black cursor-pointer flex items-center gap-2"
                >
                  <FaSignOutAlt /> Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          src={assets.menu_icon}
          alt="menu icon"
          className="w-6 md:hidden"
        />

        {/* mobile menu */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img src={assets.logo} alt="logo" className="w-36" />
            <img
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="cross icon"
              className="w-7"
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            {NavLinks.map((item, i) => (
              <NavLink to={item.path} onClick={() => setShowMenu(false)}>
                <p className="px-4 py-2 rounded inline-block">{item.label}</p>
              </NavLink>
            ))}

            {!token && (
              <NavLink to="/login" onClick={() => setShowMenu(false)}>
                <p className="px-4 py-2 rounded inline-block">LOGIN</p>
              </NavLink>
            )}
            <button
              onClick={() => {
                setShowMenu(false);
                window.open(adminURL, "_blank");
              }}
            >
              <p className="px-4 py-2 rounded inline-block">Admin Panel</p>
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
