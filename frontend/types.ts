export interface Pet {
    id: number;
    nome: string;
    especie_id: number;
    especie: string;
    idade: number;
    porte: "pequeno" | "medio" | "grande";
    descricao: string | null;
    foto_url: string | null;
    status: "disponivel" | "em_processo" | "adotado";
}