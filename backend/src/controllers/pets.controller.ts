import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { validarPet, validarId, validarFiltros } from "../validators/pets.validator.js";
import { HttpError } from "../errors.js";
import type { Request, Response } from "express";
import { pool } from "../db.js";

export async function listarPets(req: Request, res: Response) {
    const filtros = validarFiltros(req.query);

    const condicoes: string[] = [];
    const valores: (string | number) [] = [];

    if (filtros.status) {
        condicoes.push("p.status = ?");
        valores.push(filtros.status);
    }
    if (filtros.especie_id) {
        condicoes.push("p.especie_id = ?");
        valores.push(filtros.especie_id);
    }

    const where = condicoes.length ? "WHERE " + condicoes.join(" AND ") : "";

    const [rows] = await pool.query(
        `SELECT p.id, p.nome, p.especie_id, p.idade, p.porte, p.descricao, p.foto_url, p.status, 
            e.nome AS especie
        FROM pets p
        JOIN especies e ON e.id = p.especie_id
        ${where} 
        ORDER BY p.nome`,
        valores
    );
    res.json(rows);
}

export async function buscarPet(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        throw new HttpError(400, "ID do pet inválido");
    }

    const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT p.id, p.nome, p.especie_id, p.idade, p.porte, p.descricao, p.foto_url, p.status,
               e.nome AS especie
        FROM pets p
        JOIN especies e ON e.id = p.especie_id
        WHERE p.id = ?`,
        [id]
    );

    if (rows.length === 0) {
        throw new HttpError(404, "Pet não encontrado");
    }
    res.json(rows[0]);
}
export async function criarPet(req: Request, res: Response) {
    const dados = validarPet(req.body);

    const [especie] = await pool.query<RowDataPacket[]>(
        "SELECT id FROM especies WHERE id = ?",
        [dados.especie_id]
    );
    if (especie.length === 0) {
        throw new HttpError(400, "Espécie não existe");
    }

    const [resultado] = await pool.query<ResultSetHeader>(
        `INSERT INTO pets (nome, especie_id, idade, porte, descricao, foto_url, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [dados.nome, dados.especie_id, dados.idade, dados.porte, dados.descricao, dados.foto_url, dados.status]
    );
    res.status(201).json({ id: resultado.insertId, ...dados });
}
export async function atualizarPet(req: Request, res: Response) {
    const id = validarId(req.params.id);
    const dados = validarPet(req.body);

    const [existente] = await pool.query<RowDataPacket[]>(
        "SELECT id FROM pets WHERE id = ?",
        [id]
    );
    if (existente.length === 0) {
        throw new HttpError(404, "Pet não encontrado");
    }

    const [especie] = await pool.query<RowDataPacket[]>(
        "SELECT id FROM especies WHERE id = ?",
        [dados.especie_id]
    );
    if (especie.length === 0) {
        throw new HttpError(404, "Espécie não existe");
    }

    await pool.query(
        `UPDATE pets
        SET nome = ?, especie_id = ?, idade = ?, porte = ?, descricao = ?, foto_url = ?, status = ?
        WHERE id = ?`,
        [dados.nome, dados.especie_id, dados.idade, dados.porte, dados.descricao, dados.foto_url, dados.status, id]
    );

    res.json({ id, ...dados });
}
export async function deletarPet(req: Request, res: Response) {
    const id = validarId(req.params.id);

    const [resultado] = await pool.query<ResultSetHeader>(
        "DELETE FROM pets WHERE id = ?",
        [id]
    );

    if (resultado.affectedRows === 0) {
        throw new HttpError(404, "Pet não encontrado");
    }
    res.status(204).send();
}