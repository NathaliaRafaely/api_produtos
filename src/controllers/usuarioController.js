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
}

export default UsuarioController;