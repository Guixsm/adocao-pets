import { useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import ModalConfirmacao from "../components/ModalConfirmacao";
import { API_URL, deletarPet } from "../services/api";
import type { Pet } from "../types";

export default function ListaPets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [petParaRemover, setPetParaRemover] = useState<Pet | null>(null);
  const [removendo, setRemovendo] = useState(false);
  const [erroRemocao, setErroRemocao] = useState<string | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch(`${API_URL}/pets`);
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

  function pedirRemocao(pet: Pet) {
    setErroRemocao(null);
    setPetParaRemover(pet);
  }

  async function confirmarRemocao() {
    if (!petParaRemover) return;
    setRemovendo(true);
    setErroRemocao(null);

    try {
      await deletarPet(petParaRemover.id);
      setPets((atual) => atual.filter((p) => p.id !== petParaRemover.id));
      setPetParaRemover(null);
    } catch (err) {
      setErroRemocao(
        err instanceof TypeError
          ? "Não foi possível conectar ao servidor. Ele está ligado?"
          : (err as Error).message
      );
    } finally {
      setRemovendo(false);
    }
  }

  if (carregando) return <p>Carregando pets...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <div>
      <h1>Pets</h1>

      {pets.length === 0 && <p>Nenhum pet cadastrado ainda.</p>}

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} onRemover={pedirRemocao} />
        ))}
      </div>

      {petParaRemover && (
        <ModalConfirmacao
          titulo="Remover pet"
          mensagem={`Tem certeza que quer remover ${petParaRemover.nome}? Essa ação não pode ser desfeita.`}
          textoConfirmar="Remover"
          carregando={removendo}
          erro={erroRemocao}
          onConfirmar={confirmarRemocao}
          onCancelar={() => setPetParaRemover(null)}
        />
      )}
    </div>
  );
}
