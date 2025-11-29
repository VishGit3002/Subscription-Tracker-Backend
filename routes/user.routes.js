import { Router } from "express";

const router = Router();

router.get('/', (req, res) => res.send({title: "GET all users"}));

router.get('/:id', (req, res) => res.send({title: "GET user by id"}));

router.post('/', (req, res) => res.send({title: "CREATE new user"}));

router.put('/:id', (req, res) => res.send({title: "UPDATE user"}));

router.delete('/:id', (req, res) => res.send({title: "DELETE user"}));  

export default router;
