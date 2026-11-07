import { Router } from "express";
import { listarPets, 
         buscarPet, 
         criarPet,
         atualizarPet,
         deletarPet,
     } from "../controllers/pets.controller.js";

const router = Router();

router.get("/", listarPets);
router.get("/:id", buscarPet);
router.post("/", criarPet);
router.put("/:id", atualizarPet);
router.delete("/:id", deletarPet);

export default router;