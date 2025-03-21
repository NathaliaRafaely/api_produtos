import { BD } from "../../db.js";

class MovimentacaoController{
    static async novaMovimentacao(req, res){
        const{id_produto, id_usuario, tipo_movimentacao, quantidade, data_movimentacao} = req.body;

        try {
            const movimentacao = await BD.query(
                'INSERT INTO prod_movimentacoes(id_produto, id_usuario, tipo_movimentacao, quantidade, data_movimentacao) VALUES ($1, $2, $3, $4, $5)', [id_produto, id_usuario, tipo_movimentacao, quantidade, data_movimentacao]
            )
            res.status(201).json(movimentacao);
        } catch(error){
            console.log('Erro ao criar a movimentação', error);
            res.status(500).json({message:'Erro ao criar movimentação', error: error.message})
        }
    }

    //Listar todas as movimentações e buscando de chave estrageiras
    static async listarTodos(){
        const resultado = await BD.query(
            `SELECT pm.*, p.nome AS nome_produto, u_nome AS nome_usuario 
             FROM prod_movimentacoes pm 
             JOIN prod_produtos p ON pm.id_produto = p.id
             LEFT JOIN  prod_usuarios u ON pm.id_usuario = u.id
             ORDER BY pm. data_movimentacao DESC
             `        
        )
        return res.status(200).json(resultado.rows)
     }

     static async deletar (req, res){
        const {id} = req.params;
        try{
            const movimentacao = await BD.query(
                'DELETE FROM prod_movimentacoes WHERE id = $1', [id])
            return res.status(200).json({message: "Movimentação deletado com sucesso"})
        }catch(error){
            res.status(500).json({message:
                'Erro ao deletar as Movimentações', error: error.message})
        }
    }

    static async consultarPorId(req, res){
        const {id} = req.params;
        try{
            const movimentacao = await BD.query('SELECT * FROM prod_movimentacoes WHERE id = $1', [id])
            res.status(200).json(movimentacao.rows[0])
        }catch(error){
            res.status(500).json({message:
                'Erro ao consultar as movimentações', error: error.message})
        }

    }

    static async atualizarTodosCampos(req, res){
        const {id} = req.params;
        const {id_produto, id_usuario, tipo_movimentacao, quantidade, data_movimentacao} = req.body
        try{
            const movimentacao = await BD.query('UPDATE prod_movimentacoes SET id_produto = $1, id_usuario = $2, tipo_movimentacao = $3, quantidade = $4, data_movimentacao = $5 WHERE id = $6 RETURNING *', [id_produto, id_usuario, tipo_movimentacao, quantidade, data_movimentacao, id])
            res.status(200).json(movimentacao.rows [0])
        }catch(error){
            res.status(500).json({message:
                'Erro ao atualizar as movimentações', error: error.message})
        }

    }

    static async atualizar(req, res){
        const {id} = req.params;
        const {id_produto, id_usuario, tipo_movimentacao, quantidade, data_movimentacao} = req.body;

        try{
             const campos = [];
             const valores = [];

            //verificar quais campos foram fornecidos
            if(id_produto !== undefined){
                campos.push(`id_produto = $${valores.length + 1}`) //
                valores.push(id_produto);
            }
            if(id_usuario !== undefined){
                campos.push(`id_usuario = $${valores.length + 1}`)
                valores.push(id_usuario);
            }
            if(tipo_movimentacao !== undefined){
                campos.push(`tipo_movimentacao = $${valores.length + 1}`)
                valores.push(tipo_movimentacao);
            }
            if(quantidade !== undefined){
                campos.push(`quantidade = $${valores.length + 1}`)
                valores.push(quantidade);
            }
            if(data_movimentacao !== undefined){
                campos.push(`data_movimentacao = $${valores.length + 1}`)
                valores.push(data_movimentacao);
            }
            if(campos.length === 0){
                return res.status(400).json({message: 'Nenhum campo fornecido para atualizar'})
            }

            //Adicionar o id ao final de valores
            valores.push(id)

            //Montamos a query dinamicamente
            const query = `UPDATE prod_movimentacoes SET ${campos.join(', ')} WHERE id = ${id} RETURNING *`
            //Executando nossa query
            const movimentacao = await BD.query(query,valores)
            //Verifica se o movimentacao foi atualizando
            if(movimentacao.rows.length === 0){
                return res.status(404).json({message: 'Movimentação não encontrado'})
            }

            return res.status(200).json(movimentacao.rows[0])
        }catch(error){
            res.status(500).json({message:
                'Erro ao atualizar as movimentações', error: error.message})
        }
    }
}
export default MovimentacaoController