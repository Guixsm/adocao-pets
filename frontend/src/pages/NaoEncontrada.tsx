import { Link } from "react-router-dom";

export default function NaoEncontrada() {
  return (
    <div className="hero">
      <h1>Ops, essa página não existe 🐾</h1>
      <p>O endereço que você tentou abrir não foi encontrado.</p>
      <Link to="/pets" className="botao">
        Ver os pets
      </Link>
    </div>
  );
}