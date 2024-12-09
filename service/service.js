import { Pool } from "../conexao/conexao.js";

async function executaQuery(conexao,query,id){
    
    const resultado_bd = await conexao.query(query,id);
    const resultadoFormatado = await resultado_bd[0];

    return resultadoFormatado;
};

export async function retornaListaMedicos(){
    
    const conexao = await Pool.getConnection();
    const query = ('SELECT id,nome,telefone,email,descricao,especialidade FROM medicos');

    const resultadoBD = await executaQuery(conexao,query);

    conexao.release();

    return resultadoBD;
}

export async function retornaMedicoPorID(id) {
    
    const conexao = await Pool.getConnection();
    const query =('SELECT id,nome,telefone,email,descricao,especialidade FROM medicos WHERE id = ?');

    const resultadoBD = executaQuery(conexao,query,id);

    return  resultadoBD;
}

export async function apagaUsuario(id){

    const conexao = await Pool.getConnection();
    const query =('DELETE FROM medicos WHERE id = ?');

    const resultadoBD = await executaQuery(conexao,query,id);

    conexao.release();

    return resultadoBD.affectedRows;
}