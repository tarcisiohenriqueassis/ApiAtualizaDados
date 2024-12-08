import { Pool } from "../conexao/conexao.js";

async function executaQuery(conexao,query){
    
    const resultado_bd = await conexao.query(query);
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

export async function apagaUsuario(id){

    const conexao = await Pool.getConnection();
    const query =('DELETE FROM medicos WHERE id ='+id);

    let resultado;

    const resultadoBD = await executaQuery(conexao,query);

    conexao.release();

    return resultadoBD;
}