import Produtos from '../models/produtos.js'
import { BD } from '../../db.js';

class ProdutosController{
    static async novoProduto(req, res){
        const{nome, preco, imagem, link_produto, categoria, frete_gratis} = req.body;

        if(!nome || !preco || !imagem || !link_produto || !categoria ){
            return res.status(400).json({message: 'Nome, Preco, imagem, Link e Categoria são obrigatorios'})
        } try {
            const produto = await BD.query(
                'INSERT INTO prod_produtos(nome, preco, imagem, link_produto, categoria, frete_gratis) VALUES ($1, $2, $3, $4, $5, $6)', [nome, preco, imagem, link_produto, categoria, frete_gratis]
            )
            res.status(201).json(produto);
        } catch(error){
            console.log('Errro ao criar o produto', error);
            res.status(500).json({message:'Erro ao criar produto', error: error.message})
        }
    }

    static async listarTodos(req, res){
        try{
            const produtos = await Produtos.listar();
            res.status(200).json(produtos);
        }catch(error){
            res.status(500).json({message:
                'Erro ao listar os produtos', error: error.message})
        }
    }

    static async deletar (req, res){
        const {id} = req.params;
        try{
            const produto = await BD.query(
                'DELETE FROM prod_produtos WHERE id = $1', [id])
            return res.status(200).json({message: "Produto deletado com sucesso"})
        }catch(error){
            res.status(500).json({message:
                'Erro ao deletar produtos', error: error.message})
        }
    }

    static async consultarPorId(req, res){
        const {id} = req.params;
        try{
            const produto = await BD.query('SELECT * FROM prod_produtos WHERE id = $1', [id])
            res.status(200).json(produto.rows[0])
        }catch(error){
            res.status(500).json({message:
                'Erro ao consultar os produtos', error: error.message})
        }

    }

    static async atualizar(req, res){
        const {id} = req.params;
        const {nome, preco, imagem, link_produto, categoria, frete_gratis} = req.body
        try{
            const produto = await BD.query('UPDATE prod_produtos SET nome = $1, preco = $2, imagem = $3, link_produto = $4, categoria = $5, frete_gratis = $6 WHERE id = $7 RETURNING *', [nome, preco, imagem, link_produto, categoria, frete_gratis, id])
            res.status(200).json(produto.rows [0])
        }catch(error){
            res.status(500).json({message:
                'Erro ao atualizar os produtos', error: error.message})
        }

    }


}

export default ProdutosController;