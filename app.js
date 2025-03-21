import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import {testarConexao} from './db.js'
// import Produtosrouter from './src/routes/produtoRoutes.js';
// import Usuariorouter from './src/routes/usuarioRoutes.js';
import UsuarioController from './src/controllers/usuarioController.js';
import ProdutosController from './src/controllers/produtoController.js';
import MovimentacaoController from './src/controllers/movimentacaoController.js'


const app = express(); //Criar intancia do express

testarConexao();
app.use(cors());
//Uso do body-parser para receber os valores do corpo na resquisição json
app.use(bodyParser.json());
//Definir as rotas 
// app.use(Produtosrouter);
// app.use(Usuariorouter);

app.post('/usuarios', UsuarioController.novoUsuario);
app.get('/usuarios', UsuarioController.listar);
app.get('./usuarios/listar', UsuarioController.listar);
app.delete('./usuarios/:id', UsuarioController.deletar);
app.get('./usuarios/:id', UsuarioController.consultarPorId);
app.put('./usuarios/:id', UsuarioController.atualizarTodosCampos);
app.patch('./usuarios/:id', UsuarioController.atualizar);


app.post('/produtos', ProdutosController.novoProduto);
app.get('/produtos', ProdutosController.listarTodos);
app.get('/produtos/listarTodos', ProdutosController.listarTodos);
app.delete('/produtos/:id', ProdutosController.deletar);
app.get('/produtos/:id', ProdutosController.consultarPorId);
app.put('/produtos/:id', ProdutosController.atualizar);

app.post('/movimentacoes', MovimentacaoController.novaMovimentacao);
app.get('/movimentacoes', MovimentacaoController.listarTodos);
app.delete('./movimentacoes/:id', MovimentacaoController.deletar);
app.get('./movimentacoes/:id', MovimentacaoController.consultarPorId);
app.put('./movimentacoes/:id', MovimentacaoController.atualizarTodosCampos);
app.patch('./movimentacoes/:id', MovimentacaoController.atualizar)



const porta = 3000
app.listen(porta, () => {
    console.log(`Api rodando na porta http://localhost:${porta}`);
})

export default App