import type { Pet } from "../types";

export const API_URL = "http://localhost:3000";

export type DadosPet = {
  nome: string;
  especie_id: number;
  idade: number;
  porte: string;
  descricao: string | null;
  foto_url: string | null;
  status: string;
};

async function tratarResposta(resposta: Response) {
  const corpo = await resposta.json();
  if (!resposta.ok) {
    throw new Error(corpo.erro ?? "Erro na requisição");
  }
  return corpo;
}

export async function criarPet(dados: DadosPet): Promise<{ id: number }> {
  const resposta = await fetch(`${API_URL}/pets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return tratarResposta(resposta);
}

export async function buscarPet(id: number): Promise<Pet> {
  const resposta = await fetch(`${API_URL}/pets/${id}`);
  return tratarResposta(resposta);
}

export async function atualizarPet(id: number, dados: DadosPet): Promise<{ id: number }> {
  const resposta = await fetch(`${API_URL}/pets/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return tratarResposta(resposta);
}

export async function deletarPet(id: number): Promise<void> {
  const resposta = await fetch(`${API_URL}/pets/${id}`, { method: "DELETE" });
  if (!resposta.ok) {
    const corpo = await resposta.json();
    throw new Error(corpo.erro ?? "Erro ao remover o pet");
  }
}