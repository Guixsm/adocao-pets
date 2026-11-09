import { useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import type { Pet } from "../types";

export default function ListaPets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch("http://localhost:3000/pets");
        if (!resposta.ok) throw new Error("Resposta com erro");
        setPets(await resposta.json());
      } catch {
        setErro("Não foi possível carregar os pets. O servidor está ligado?");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  if (carregando) return <p>Carregando pets...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <div>
      <h1>Pets</h1>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
}