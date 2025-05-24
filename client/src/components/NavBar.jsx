import { NavLink, useNavigate } from "react-router-dom";
import logo from '../assets/logo.svg';
import { useAuth } from "../contexts/AuthContext";

function NavBar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-white px-20 py-5 shadow-md">
      <NavLink to="/">
        <img src={logo} className="h-8" alt="Logo" />
      </NavLink>
      <section className="flex gap-5 items-center justify-center font-bold text-[#386641]">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            "h-5" + (isActive ? " underline" : "")
          }
        >
          Início
        </NavLink>
        <NavLink
          to="/cadastros"
          className={({ isActive }) =>
            "h-5" + (isActive ? " underline" : "")
          }
        >
          Cadastros
        </NavLink>
        {usuario && (
          <button
            onClick={handleLogout}
            className="h-5 text-red-600 hover:underline border-0 bg-transparent font-bold cursor-pointer"
          >
            Sair
          </button>
        )}
      </section>
    </nav>
  );
}

export default NavBar;
