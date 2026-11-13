import { Link } from "react-router-dom";
import type { Pet } from "../types";

type Props = {
  pet: Pet;
  onRemover?: (pet: Pet) => void;
};

export default function PetCard({ pet, onRemover }: Props) {
  return (
    <div className="pet-card">
      <h3>{pet.nome}</h3>
      <p>
        {pet.especie} · {pet.idade} ano(s) · {pet.porte}
      </p>
      <p>{pet.descricao}</p>
      <strong>{pet.status}</strong>
      <div>
        <Link to={`/pets/${pet.id}/editar`}>Editar</Link>
        {onRemover && <button onClick={() => onRemover(pet)}>Remover</button>}
      </div>
    </div>
  );
}