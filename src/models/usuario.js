import { BD } from "../../db.js";

class Usuario{
    //função estatica para novo usuario
    static async novoUsuario(nome, email, senha){
    const resultado = await BD.query(
        'INSERT INTO prod_usuarios(nome, email, senha) VALUES ($1, $2, $3)'
    )
    return resultado.rows[0];
}
}
export default Usuario;