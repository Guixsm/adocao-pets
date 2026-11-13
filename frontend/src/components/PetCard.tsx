import { Link } from "react-router-dom";
import type { Pet } from "../types";

const ROTULOS = {
  disponivel: "Disponível",
  em_processo: "Em processo",
  adotado: "Adotado",
};

type Props = {
  pet: Pet;
  onRemover?: (pet: Pet) => void;
  mostrarAcoes?: boolean;
};

export default function PetCard({ pet, onRemover, mostrarAcoes = true }: Props) {
  return (
    <div className="pet-card">
      {pet.foto_url ? (
        <img className="pet-foto" src={pet.foto_url} alt={`Foto de ${pet.nome}`} />
      ) : (
        <div className="pet-foto pet-foto-vazia">🐾</div>
      )}

      <div className="pet-info">
        <h3>{pet.nome}</h3>
        <span className={`etiqueta etiqueta-${pet.status}`}>
          {ROTULOS[pet.status]}
        </span>
        <p>
          {pet.especie} · {pet.idade} ano(s) · {pet.porte}
        </p>
        <p className="pet-descricao">{pet.descricao}</p>

        {mostrarAcoes && (
          <div className="pet-acoes">
            <Link to={`/pets/${pet.id}/editar`} className="botao">
              Editar
            </Link>
            {onRemover && (
              <button className="botao-contorno" onClick={() => onRemover(pet)}>
                Remover
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}