import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import {testarConexao} from './db.js'
import router from './src/routes/usuarioRoutes.js';
import Produtosrouter from './src/routes/produtoRoutes.js';
import UsuarioController from './src/controllers/usuarioController.js';


const app = express(); //Criar intancia do express

testarConexao();
app.use(cors());
//Uso do body-parser para receber os valores do corpo na resquisição json
app.use(bodyParser.json());
//Definir as rotas 
app.use(router);
app.use(Produtosrouter);

app.get('./usuarios/listar', UsuarioController.listar)
app.delete('./usuarios/deletar/:id', UsuarioController.deletar)


const porta = 3000
app.listen(porta, () => {
    console.log(`Api rodando na porta https://localhost:${porta}`);
})