import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../assets/logo.svg';
import { useAuth } from "../contexts/AuthContext";

function NavBar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="flex items-center justify-between bg-white px-4 md:px-20 py-5 shadow-md relative">
      <NavLink to="/" onClick={() => setMenuOpen(false)}>
        <img src={logo} className="h-8" alt="Logo" />
      </NavLink>

      {/* Hamburger Icon - mobile only */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-10 h-10"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menu"
      >
        <span className={`block h-1 w-6 bg-[#386641] rounded-sm transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
        <span className={`block h-1 w-6 bg-[#386641] rounded-sm my-1 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
        <span className={`block h-1 w-6 bg-[#386641] rounded-sm transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
      </button>

      {/* Menu desktop */}
      <section className="hidden md:flex gap-5 items-center justify-center font-bold text-[#386641]">
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

      {/* Menu mobile */}
      {menuOpen && (
        <section
          className="md:hidden absolute right-4 top-16 bg-white rounded shadow-md flex flex-col gap-4 px-6 py-4 font-bold text-[#386641] z-50 animate-fadeIn"
          style={{ minWidth: "160px" }}
        >
          <NavLink
            to="/"
            end
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              "h-5 block" + (isActive ? " underline" : "")
            }
          >
            Início
          </NavLink>
          <NavLink
            to="/cadastros"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              "h-5 block" + (isActive ? " underline" : "")
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
      )}
    </nav>
  );
}

export default NavBar;
