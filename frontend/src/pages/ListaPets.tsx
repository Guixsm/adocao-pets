import Carregando from "../components/Carregando";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PetCard from "../components/PetCard";
import ModalConfirmacao from "../components/ModalConfirmacao";
import { API_URL, deletarPet } from "../services/api";
import type { Pet } from "../types";

type Especie = { id: number; nome: string };

export default function ListaPets() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sucesso, setSucesso] = useState<string | null>(location.state?.mensagem ?? null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [especies, setEspecies] = useState<Especie[]>([]);
  const [filtroStatus, setFiltroStatus] = useState("");
  const [filtroEspecie, setFiltroEspecie] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [petParaRemover, setPetParaRemover] = useState<Pet | null>(null);
  const [removendo, setRemovendo] = useState(false);
  const [erroRemocao, setErroRemocao] = useState<string | null>(null);

  useEffect(() => {
  if (location.state?.mensagem) {
    navigate(location.pathname, { replace: true, state: null });
  }
}, [location.pathname, location.state, navigate]);

useEffect(() => {
  if (!sucesso) return;
  const timer = setTimeout(() => setSucesso(null), 4000);
  return () => clearTimeout(timer);
}, [sucesso]);

  useEffect(() => {
    async function carregarEspecies() {
      try {
        const resposta = await fetch(`${API_URL}/especies`);
        if (resposta.ok) setEspecies(await resposta.json());
      } catch {
        // Sem as espécies, só não aparecem as opções do filtro
      }
    }
    carregarEspecies();
  }, []);

  useEffect(() => {
    async function carregar() {
      setCarregando(true);
      setErro(null);
      try {
        const params = new URLSearchParams();
        if (filtroStatus) params.set("status", filtroStatus);
        if (filtroEspecie) params.set("especie_id", filtroEspecie);
        const query = params.toString();

        const resposta = await fetch(`${API_URL}/pets${query ? `?${query}` : ""}`);
        if (!resposta.ok) throw new Error("Resposta com erro");
        setPets(await resposta.json());
      } catch {
        setErro("Não foi possível carregar os pets. O servidor está ligado?");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, [filtroStatus, filtroEspecie]);

  function limparFiltros() {
    setFiltroStatus("");
    setFiltroEspecie("");
  }

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
      setSucesso("Pet removido com sucesso!");
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

  return (
    <div>
      <h1>Pets</h1>
      {sucesso && <p className="sucesso">{sucesso}</p>}
      <div className="filtros">
        <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
          <option value="">Todos os status</option>
          <option value="disponivel">Disponível</option>
          <option value="em_processo">Em processo</option>
          <option value="adotado">Adotado</option>
        </select>

        <select value={filtroEspecie} onChange={(e) => setFiltroEspecie(e.target.value)}>
          <option value="">Todas as espécies</option>
          {especies.map((esp) => (
            <option key={esp.id} value={esp.id}>
              {esp.nome}
            </option>
          ))}
        </select>

        {(filtroStatus || filtroEspecie) && (
          <button className="botao-secundario" onClick={limparFiltros}>
            Limpar filtros
          </button>
        )}
      </div>

      {carregando && <Carregando texto="Carregando pets..." />}
      {erro && <p className="erro">{erro}</p>}

      {!carregando && !erro && pets.length === 0 && <p>Nenhum pet encontrado.</p>}

      {!carregando && !erro && pets.length > 0 && (
        <div className="pets-grid">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} onRemover={pedirRemocao} />
          ))}
        </div>
      )}

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