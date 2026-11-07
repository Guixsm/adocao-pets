# 🐾 Adoção de Pets

Aplicação web full stack (CRUD completo) para cadastro e adoção de pets.

## Tecnologias
- **Front-end:** React, Vite, TypeScript
- **Back-end:** Node.js, Express, TypeScript
- **Banco de dados:** MySQL (driver `mysql2`)

## Funcionalidades
- Cadastrar, listar, editar e remover pets
- Filtrar pets por status e espécie
- Validação de dados (body, params e query) e tratamento de erros centralizado
- Arquitetura cliente-servidor com API REST

## API
| Método | Rota | Descrição |
|---|---|---|
| GET | `/pets` | Lista pets (filtros: `status`, `especie_id`) |
| GET | `/pets/:id` | Busca um pet |
| POST | `/pets` | Cria um pet (201) |
| PUT | `/pets/:id` | Atualiza um pet |
| DELETE | `/pets/:id` | Remove um pet (204) |
| GET | `/especies` | Lista as espécies |

## Como rodar
1. **Banco:** execute `database/schema.sql` no MySQL Workbench.
2. **Back-end:**
   ```bash
   cd backend
   cp .env.example .env   # preencha a senha do MySQL
   npm install
   npx tsx watch src/server.ts
   ```
3. **Front-end:** *(em desenvolvimento)*

## Estrutura
```
adocao-pets/
├── backend/    # API Express (routes, controllers, validators, middlewares)
├── frontend/   # React + Vite
└── database/   # script SQL
```

## Autoria
Guilherme de Jesus Moura Miranda · IFGoiano · Ciência da Computação