import FormularioPet from "./pages/FormularioPet";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ListaPets from "./pages/ListaPets";

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Início</Link> | <Link to="/pets">Pets</Link> | 
        <Link to="/pets/novo"> Cadastrar</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<ListaPets />} />
        <Route path="/pets/novo" element={<FormularioPet />} />
        <Route path="/pets/:id/editar" element={<FormularioPet />} />
      </Routes>
    </>
  );
}