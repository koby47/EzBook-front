import { Link } from "react-router-dom"

const NavBar =()=>{
   
    return ( <nav className="bg-white shadow-md">
      <div className="max-w-7xl  h-20  mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="" className="text-2xl font-bold text-blue-600">
          EzBook
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-6 text-gray-700">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/facilities">Facilities</Link></li>
          <li><Link to="/bookings">Bookings</Link></li>
          <li><Link to="/login" className="text-blue-600 font-semibold">Login</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-blue-600 text-xl">&#9776;</button>
        </div>
      </div>
    </nav>)

}

export default NavBar