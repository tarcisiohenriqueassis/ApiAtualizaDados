import express from 'express';
import cors from 'cors';

import { retornaListaMedicos,retornaMedicoPorID,apagaUsuario } from './service/service.js';

const app = express();

//cors responsavel pela segurança da API
app.use(cors());

//express.json() usado para poder modificar o body da tabela, insert,delete
app.use(express.json());

// retorna a lista completa dos medicos do mysql
app.get('/medicos',async (req,res)=>{

    res.json(await retornaListaMedicos());
});

// retorna Medico pelo ID digitado
app.get('/medicos/:id', async (req,res)=>{

    let id = req.params.id;

    // expressão do ID valido 
    const regExp =/^\d+$/;

    //se o ID não digitado não for valido vai mostrar status(406)
    if(!regExp.test(id)){
        res.status(406).json({ mensagem : `Digite apenas numeros`});
        return;
    }

    //recebe o resultado da função retornamedicoPorID
    const resultadoID = await retornaMedicoPorID(parseInt(id));

    // verifica se o resultadoID retornou um valor maior q 0 
    if(resultadoID.length > 0){

        res.json(resultadoID);
    }
    else{
        res.status(404).json({mensagem : `Usuario não encontrado`});
    }
    
});

//apaga usuario medico pelo ID 
app.delete('/medicos/:id',async(req,res)=>{

    let id = req.params.id;

    //expressão do ID valido
    const regExp = /^\d+$/;

    //se o ID não digitado não for valido vai mostrar status(406)
    if(!regExp.test((id))){
        res.status(406).json({mensagem : `Valor digitado invalido`});
        return
    }
    //recebe o valor do affectedRows
    const apagausuarioBD = await apagaUsuario(parseInt(id));

    //se o valor do affectedRows for maior que 0 retorna o status(200) , se não for maior que 0 retorna o status(404)
    if(apagausuarioBD > 0){
        res.status(200).json({mensagem :` Usuario do ID ${id} excluido com sucesso`});
        return;
    }
    else{
        res.status(404).json({mensagem : `usuario do id ${id}, não encontrado`});
        return;
    }

});
app.listen(3001, async()=>{
    console.log("Servidor iniciado na port 3001");
});