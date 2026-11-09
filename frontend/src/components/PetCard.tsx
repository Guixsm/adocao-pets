import type { Pet } from "../types";

type Props = {
    pet: Pet;
};

export default function PetCard({ pet }: Props) {
    return (
        <div className="pet-card">
            <h3>{pet.nome}</h3>
            <p>
                {pet.especie} . {pet.idade} ano(s) . {pet.porte}
                </p>0
                <p>{pet.descricao}</p>
                <strong>{pet.status}</strong>
                </div>
    );
}