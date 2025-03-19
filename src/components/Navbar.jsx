import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-500 shadow-lg py-3 px-10 flex items-center rounded-full mx-24 mt-5 backdrop-blur-md border border-shadow-md">
            <div>
                <Link to="/" className="text-white text-lg font-bold">WhatAge</Link>
            </div>

            <div className="ml-auto flex items-center space-x-6">
                <Link to="/" className="text-gray-300 hover:text-white transition duration-300">Home</Link>
                <Link to="/about" className="text-gray-300 hover:text-white transition duration-300">About</Link>
                <Link to="/contact" className="text-gray-300 hover:text-white transition duration-300">Contact</Link>
            </div>
        </nav>
    );
};

export default Navbar;
