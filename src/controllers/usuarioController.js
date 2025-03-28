import {BD} from "../../db.js"
import Usuario from "../models/usuario.js";

class UsuarioController {
    static async novoUsuario(req, res){
        const{nome, email, senha} = req.body;

        //Validando dados
        if(!nome || !email || !senha){
            return res.status(400).json({message: 'Nome, email e senha são obrigatorios'})
        } try {
            //Chama o metodo na classe usuario para criar 
            const usuario = await Usuario.novoUsuario(nome, email, senha);
            res.status(201).json(usuario); //retorna o usuario criado com status
        } catch(error){
            console.log('Errro ao criar o usuario', error);
            res.status(500).json({message:'Erro ao criar usuario', error: error.message})
        }
    }
    //Função para listar todos os usuarios
    static async listar(req, res){
        try{
            const usuarios = await BD.query('SELECT * FROM prod_usuarios');
            res.status(200).json(usuarios.rows);
        }catch(error){
            res.status(500).json({message:
                'Erro ao listar os usuarios', error: error.message})
        }
    }
    static async deletar (req, res){
        const {id} = req.params;
        try{
            const usuario = await BD.query(
                'DELETE FROM prod_usuarios WHERE id = $1', [id])
            return res.status(200).json({message: "Usuario deletado com sucesso"})
        }catch(error){
            res.status(500).json({message:
                'Erro ao deletar os usuarios', error: error.message})
        }
    }

    static async consultarPorId(req, res){
        const {id} = req.params;
        try{
            const usuario = await BD.query('SELECT * FROM prod_usuarios WHERE id = $1', [id])
            res.status(200).json(usuario.rows[0])
        }catch(error){
            res.status(500).json({message:
                'Erro ao consultar os usuarios', error: error.message})
        }

    }

    static async atualizarTodosCampos(req, res){
        const {id} = req.params;
        const {nome, email, senha} = req.body
        try{
            const usuario = await BD.query('UPDATE prod_usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *', [nome, email, senha, id])
            res.status(200).json(usuario.rows [0])
        }catch(error){
            res.status(500).json({message:
                'Erro ao atualizar os usuarios', error: error.message})
        }

    }

    //função para atualizar os valoresindividuais caso nessesario
    static async atualizar(req, res){
        const {id} = req.params;
        const {nome, email, senha} = req.body;

        try{
             const campos = [];
             const valores = [];

            //verificar quais campos foram fornecidos
            if(nome !== undefined){
                campos.push(`nome = $${valores.length + 1}`) //
                valores.push(nome);
            }
            if(email !== undefined){
                campos.push(`email = $${valores.length + 1}`)
                valores.push(email);
            }
            if(senha !== undefined){
                campos.push(`senha = $${valores.length + 1}`)
                valores.push(senha);
            }
            if(campos.length === 0){
                return res.status(400).json({message: 'Nenhum campo fornecido para atualizar'})
            }

            //Adicionar o id ao final de valores
            valores.push(id)

            //Montamos a query dinamicamente
            const query = `UPDATE prod_usuarios SET ${campos.join(', ')} WHERE id = ${id} RETURNING *`
            //Executando nossa query
            const usuario = await BD.query(query,valores)
            //Verifica se o usuario foi atualizando
            if(usuario.rows.length === 0){
                return res.status(404).json({message: 'Usuario não encontrado'})
            }

            return res.status(200).json(usuario.rows[0])
        }catch(error){
            res.status(500).json({message:
                'Erro ao atualizar os usuarios', error: error.message})
        }
    }
    
}

export default UsuarioController;