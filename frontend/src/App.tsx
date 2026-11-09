import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ListaPets from "./pages/ListaPets";

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Início</Link> | <Link to="/pets">Pets</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<ListaPets />} />
      </Routes>
    </>
  );
}