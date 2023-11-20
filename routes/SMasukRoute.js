import express from "express";
import {
    getSM,
    getSMById,
    saveSM,
    updateSM,
    deleteSM,
    getRecordSM,
} from "../controllers/SMasukController.js"

const router = express.Router();

router.get('/sm', getSM);
router.get('/sm/:id', getSMById);
router.post('/sm', saveSM);
router.patch('/sm/:id', updateSM);
router.delete('/sm/:id', deleteSM);
router.get('/countSM', getRecordSM);

export default router;