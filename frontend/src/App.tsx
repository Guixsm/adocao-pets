import { Routes, Route, NavLink } from "react-router-dom";
import FormularioPet from "./pages/FormularioPet";
import Home from "./pages/Home";
import ListaPets from "./pages/ListaPets";
import logo from "./assets/caozinho.gif";
import NaoEncontrada from "./pages/NaoEncontrada";

export default function App() {
  return (
    <>
     <nav className="menu">
  <img src={logo} alt="" className="menu-logo-img" />

  <div className="menu-texto">
    <NavLink to="/" end className="menu-logo">Adoção de Pets</NavLink>

    <div className="menu-links">
      <NavLink to="/" end>Início</NavLink>
      <NavLink to="/pets" end>Pets</NavLink>
      <NavLink to="/pets/novo">Cadastrar</NavLink>
    </div>
  </div>
</nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<ListaPets />} />
        <Route path="/pets/novo" element={<FormularioPet />} />
        <Route path="/pets/:id/editar" element={<FormularioPet />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Routes>

      <footer className="rodape">
  Adote, não compre! - {" "}
  <a href="https://github.com/Guixsm/adocao-pets" target="_blank" rel="noreferrer">
    Código no GitHub
  </a>
</footer>
    </>
  );
}