import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, atualizarPet, buscarPet, criarPet } from "../services/api";

type Especie = { id: number; nome: string };

function mensagemDeErro(err: unknown) {
  if (err instanceof TypeError) {
    return "Não foi possível conectar ao servidor. Ele está ligado?";
  }
  return (err as Error).message;
}

export default function FormularioPet() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editando = id !== undefined;

  const [especies, setEspecies] = useState<Especie[]>([]);
  const [nome, setNome] = useState("");
  const [especieId, setEspecieId] = useState("");
  const [idade, setIdade] = useState("");
  const [porte, setPorte] = useState("pequeno");
  const [descricao, setDescricao] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [status, setStatus] = useState("disponivel");

  const [carregandoPet, setCarregandoPet] = useState(editando);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarEspecies() {
      const resposta = await fetch(`${API_URL}/especies`);
      setEspecies(await resposta.json());
    }
    carregarEspecies();
  }, []);

  useEffect(() => {
    if (!editando) return;
    async function carregarPet() {
      try {
        const pet = await buscarPet(Number(id));
        setNome(pet.nome);
        setEspecieId(String(pet.especie_id));
        setIdade(String(pet.idade));
        setPorte(pet.porte);
        setDescricao(pet.descricao ?? "");
        setFotoUrl(pet.foto_url ?? "");
        setStatus(pet.status);
      } catch (err) {
        setErro(mensagemDeErro(err));
      } finally {
        setCarregandoPet(false);
      }
    }
    carregarPet();
  }, [id, editando]);

  async function enviar(e: FormEvent) {
    e.preventDefault();
    setErro(null);
    setEnviando(true);

    const dados = {
      nome,
      especie_id: Number(especieId),
      idade: Number(idade),
      porte,
      descricao: descricao || null,
      foto_url: fotoUrl || null,
      status,
    };

    try {
      if (editando) {
        await atualizarPet(Number(id), dados);
      } else {
        await criarPet(dados);
      }
      navigate("/pets");
    } catch (err) {
      setErro(mensagemDeErro(err));
    } finally {
      setEnviando(false);
    }
  }

  if (carregandoPet) return <p>Carregando pet...</p>;

  return (
    <div>
      <h1>{editando ? "Editar pet" : "Cadastrar pet"}</h1>

      {erro && <p style={{ color: "crimson" }}>{erro}</p>}

      <form onSubmit={enviar}>
        <div>
          <label>Nome</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>

        <div>
          <label>Espécie</label>
          <select value={especieId} onChange={(e) => setEspecieId(e.target.value)}>
            <option value="">Selecione...</option>
            {especies.map((esp) => (
              <option key={esp.id} value={esp.id}>
                {esp.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Idade</label>
          <input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} />
        </div>

        <div>
          <label>Porte</label>
          <select value={porte} onChange={(e) => setPorte(e.target.value)}>
            <option value="pequeno">Pequeno</option>
            <option value="medio">Médio</option>
            <option value="grande">Grande</option>
          </select>
        </div>

        <div>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="disponivel">Disponível</option>
            <option value="em_processo">Em processo</option>
            <option value="adotado">Adotado</option>
          </select>
        </div>

        <div>
          <label>Descrição</label>
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </div>

        <div>
          <label>Foto (link)</label>
          <input value={fotoUrl} onChange={(e) => setFotoUrl(e.target.value)} />
        </div>

        <button type="submit" disabled={enviando}>
          {enviando ? "Salvando..." : editando ? "Salvar alterações" : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}