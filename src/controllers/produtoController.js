import Produtos from '../models/produtos.js'

class ProdutosController{
    static async novoProduto(req, res){
        const{nome, preco, link_produto, categoria, frete_gratis} = req.body;

        if(!nome || !preco || !link_produto || !categoria || !frete_gratis){
            return res.status(400).json({message: 'Nome, Preco, Linh, Categoria e o Fretes Gratis são obrigatorios'})
        } try {
            const produto = await Produtos.novoProduto(nome, preco, imagem, link_produto, categoria, frete_gratis);
            res.status(201).json(produto);
        } catch(error){
            console.log('Errro ao criar o produto', error);
            res.status(500).json({message:'Erro ao criar produto', error: error.message})
        }
    }
}

export default ProdutosController;