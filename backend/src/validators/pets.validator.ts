import { HttpError } from "../errors.js";

const PORTES = ["pequeno", "medio", "grande"];
const STATUS = ["disponivel", "em_processo", "adotado"];

export function validarPet(body: any) {
    const b = body ?? {};

    if (typeof b.nome !== "string" || b.nome.trim() === "" || b.nome.lenght > 100) {
        throw new HttpError(400, "Nome é obrigatório (até 100 caracteres)");
    }
    if (!Number.isInteger(b.especie_id) || b.especie_id <= 0) {
        throw new HttpError(400, "especie_id inválido");
    }
    if (!Number.isInteger(b.idade) || b.idade < 0) {
        throw new HttpError(400, "Idade deve ser um número inteiro maior ou igual a 0");
    }
    if (!PORTES.includes(b.porte)) {
        throw new HttpError(400, "Porte deve ser pequeno, medio ou grande");
    }
    const status = b.status ?? "disponivel";
    if (!STATUS.includes(status)) {
        throw new HttpError(400, "Status deve ser disponivel, em_processo ou adotado");
    }
    if (b.descricao != null && typeof b.descricao !== "string") {
        throw new HttpError(400, "Descrição deve ser texto");
    }
    if (b.foto_url != null && (typeof b.foto_url !== "string" || b.foto_url.length > 255)) {
        throw new HttpError(400, "foto_url deve ser um texto de até 255 caracteres");
    }

    return {
        nome: b.nome.trim() as string,
        especie_id: b.especie_id as number,
        idade: b.idade as number,
        porte: b.porte as string,
        descricao: (b.descricao ?? null) as string | null,
        foto_url: (b.foto_url ?? null) as string | null,
        status: status as string,
    };
}
export function validarId(valor: unknown): number {
    const id = Number(valor);
    if (!Number.isInteger(id) || id <= 0) {
        throw new HttpError(400, "ID inválido");
    }
    return id;
}
export function validarFiltros(query: any) {
    const filtros: { status?: string; especie_id?: number } = {};

    if (query.status !== undefined) {
        if (typeof query.status !== "string" || !STATUS.includes(query.status)) {
            throw new HttpError(404, "Status deve ser disponivel, em_processo ou adotado");
        }
        filtros.status = query.status;
    }

    if (query.especie_id !== undefined) {
        const id = Number(query.especie_id);
        if (!Number.isInteger(id) || id <= 0) {
            throw new HttpError(404, "especie_id inválido");
        }
        filtros.especie_id = id;
    }
    return filtros;
}