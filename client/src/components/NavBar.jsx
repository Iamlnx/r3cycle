import { NavLink } from "react-router-dom";
import logo from '../assets/logo.svg';

function NavBar() {
  return (
    <nav className="flex items-center justify-between bg-white px-20 py-5">
      <img src={logo} className="h-8" alt="Logo" />
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
      </section>
    </nav>
  );
}

export default NavBar;
