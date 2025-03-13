import express from 'express'
import UsuarioController from '../controllers/usuarioController.js'

const router = express.Router();

router.post('/usuarios', UsuarioController.novoUsuario);
router.get('/usuarios', UsuarioController.listar);

export default router;