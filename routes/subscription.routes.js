import { Router } from "express";

const router = Router();

router.get('/', (req, res) => res.send({title: "GET all subscriptions"}));

router.get('/:id', (req, res) => res.send({title: "GET subscription by id"}));

router.post('/', (req, res) => res.send({title: "CREATE new subscription"}));

router.put('/:id', (req, res) => res.send({title: "UPDATE subscription"}));

router.delete('/:id', (req, res) => res.send({title: "DELETE subscription"}));

router.get('/user/:id', (req, res) => res.send({title: "GET all user subscriptions"}));

router.put('/:id/cancel', (req, res) => res.send({title: "CANCEL subscription"}));

router.get('/upcoming-renewals', (req, res) => res.send({title: "GET upcoming renewals"}));

export default router;