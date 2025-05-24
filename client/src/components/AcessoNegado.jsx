import { NavLink } from "react-router-dom";

function AcessoNegado() {
  return (
    <div style={{ padding: "2rem", textAlign: "center", color: "#bc4749" }}>
      <h2>Acesso negado</h2>
      <p>Você não tem permissão para acessar esta página.</p>
      <NavLink to="/"> Voltar </NavLink>
    </div>
  );
}

export default AcessoNegado;
