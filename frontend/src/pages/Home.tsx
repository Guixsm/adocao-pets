import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PetCard from "../components/PetCard";
import { API_URL } from "../services/api";
import type { Pet } from "../types";

export default function Home() {
  const [destaques, setDestaques] = useState<Pet[]>([]);

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch(`${API_URL}/pets?status=disponivel`);
        if (!resposta.ok) return;
        const pets: Pet[] = await resposta.json();
        setDestaques(pets.slice(0, 3));
      } catch {
        // Na Home, se a API falhar, só não mostramos os destaques
      }
    }
    carregar();
  }, []);

  return (
    <div>
      <section className="hero">
        <h1>Encontre um novo amigo para chamar de seu 🐾</h1>
        <p>
          Cães, gatos e coelhos esperando por um lar cheio de carinho.
          Dê uma olhada nos pets disponíveis para adoção.
        </p>
        <Link to="/pets" className="botao">
          Ver todos os pets
        </Link>
      </section>

      {destaques.length > 0 && (
        <section>
          <h2>Esperando por você</h2>
          <div className="pets-grid">
            {destaques.map((pet) => (
              <PetCard key={pet.id} pet={pet} mostrarAcoes={false} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}