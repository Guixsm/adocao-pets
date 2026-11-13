import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, criarPet } from "../services/api";

type Especie = { id: number; nome: string };

export default function FormularioPet() {
  const navigate = useNavigate();

  const [especies, setEspecies] = useState<Especie[]>([]);
  const [nome, setNome] = useState("");
  const [especieId, setEspecieId] = useState("");
  const [idade, setIdade] = useState("");
  const [porte, setPorte] = useState("pequeno");
  const [descricao, setDescricao] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");

  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarEspecies() {
      const resposta = await fetch(`${API_URL}/especies`);
      setEspecies(await resposta.json());
    }
    carregarEspecies();
  }, []);

  async function enviar(e: FormEvent) {
    e.preventDefault();
    setErro(null);
    setEnviando(true);

    try {
      await criarPet({
        nome,
        especie_id: Number(especieId),
        idade: Number(idade),
        porte,
        descricao: descricao || null,
        foto_url: fotoUrl || null,
      });
      navigate("/pets");
    } catch (err) {
      if (err instanceof TypeError) {
        setErro("Não foi possível conectar ao servidor. Ele está ligado?");
      } else {
        setErro((err as Error).message);
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div>
      <h1>Cadastrar pet</h1>

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
          <label>Descrição</label>
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </div>

        <div>
          <label>Foto (link)</label>
          <input value={fotoUrl} onChange={(e) => setFotoUrl(e.target.value)} />
        </div>

        <button type="submit" disabled={enviando}>
          {enviando ? "Salvando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}