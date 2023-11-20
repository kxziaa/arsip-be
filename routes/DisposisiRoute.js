import express from "express";
import {
    saveDisposisi,
    getDisposisi,
    getDisposisiById,
    deleteDisp,
    getDispMasuk
} from "../controllers/DisposisiController.js"
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/disp', verifyUser, getDisposisi);
router.get('/disp/:id', verifyUser, getDisposisiById);
router.post('/disp', verifyUser, saveDisposisi);
router.delete('/disp/:id', verifyUser, deleteDisp);
router.get('/dispMasuk', verifyUser, getDispMasuk);

export default router;