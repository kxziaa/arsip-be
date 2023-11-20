import express from "express";
import {
    getSK,
    getSKById,
    saveSK,
    updateSK,
    deleteSK,
    countRecordSK
} from "../controllers/SKeluarController.js"

const router = express.Router();

router.get('/sk', getSK);
router.get('/sk/:id', getSKById);
router.post('/sk', saveSK);
router.patch('/sk/:id', updateSK);
router.delete('/sk/:id', deleteSK);
router.get('/skCount', countRecordSK);

export default router;