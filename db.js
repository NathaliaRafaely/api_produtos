import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config()

const BD = new Pool({
    connectionString: process.env.DATABASE_URL
})

const testarConexao = async () => {
    try{
        const client = await BD.connect();//Tentar estabelecer a conexao com o banco de dados
        console.log("✔ Conexão com o banco de dados estabelecida");
        client.release();//Libera o client
    }catch(error){
        console.error("Erro ao conectar ao banco de dados", error.message)
    }
}
export {BD, testarConexao};