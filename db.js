import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config()

const BD = new Pool({
    connectionString: "postgres://postgres.fvtjiofoozsytedduvdk:vHmWrXGayMP5VdGq@aws-0-sa-east-1.pooler.supabase.com:5432/postgres",
    ssl: {
        rejectUnauthorized: false
    }
})

// const BD = new Pool({
//     user: 'postgres', 
//     host: 'localhost',
//     database:'bd_produtos',
//     password: 'admin',
//     port: 5432,
// })

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