import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ClipboardList, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-4 md:relative">
      <div className="max-w-screen-xl mx-auto">
        <ul className="flex justify-around items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex flex-col items-center space-y-1 ${
                  isActive ? 'text-orange-500' : 'text-gray-600 hover:text-orange-400'
                }`
              }
            >
              <div className={`p-2 rounded-full transition-colors duration-200`}>
                <Home size={24} />
              </div>
              <span className="text-xs">Items</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/supplier"
              className={({ isActive }) =>
                `flex flex-col items-center space-y-1 ${
                  isActive ? 'text-orange-500' : 'text-gray-600 hover:text-orange-400'
                }`
              }
            >
              <div className={`p-2 rounded-full transition-colors duration-200`}>
                <ClipboardList size={24} />
              </div>
              <span className="text-xs">Suppliers</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/purchase"
              className={({ isActive }) =>
                `flex flex-col items-center space-y-1 ${
                  isActive ? 'text-orange-500' : 'text-gray-600 hover:text-orange-400'
                }`
              }
            >
              <div className={`p-2 rounded-full transition-colors duration-200`}>
                <ShoppingCart size={24} />
              </div>
              <span className="text-xs">Purchase</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;