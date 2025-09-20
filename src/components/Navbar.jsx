import "./Navbar.css"; // стили
import logo from "../assets/rooms.svg";
import { AuthProvider, useAuth } from "../context/AuthContext";

function Navbar() {
    const {user, logout, isAuthenticated} = useAuth();
    console.log('isAuthenticated navbar', isAuthenticated);
  return (
    <header className="navbar">
        <img src={logo} alt="ROOMS" className="navbar__logo"/>
        {isAuthenticated &&
        <nav className="navbar__links">
            <p>{user.name}</p>
            <p onClick={logout}>Logout</p>
        </nav>
        }
    </header>
  );
}

export default Navbar;
