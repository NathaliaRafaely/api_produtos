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
            const usuarios = await Usuario.listar();
            res.status(200).json(usuarios);
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
            return res.status(200).json(usuario.rows[0])
        }catch(error){
            res.status(500).json({message:
                'Erro ao listar os usuarios', error: error.message})
        }
    }
}

export default UsuarioController;