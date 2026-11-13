export const API_URL = "http://localhost:3000";

export type DadosPet = {
  nome: string;
  especie_id: number;
  idade: number;
  porte: string;
  descricao: string | null;
  foto_url: string | null;
};

export async function criarPet(dados: DadosPet): Promise<{ id: number }> {
  const resposta = await fetch(`${API_URL}/pets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  const corpo = await resposta.json();

  if (!resposta.ok) {
    throw new Error(corpo.erro ?? "Erro ao salvar o pet");
  }
  return corpo;
}