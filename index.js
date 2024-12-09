import express from 'express';
import cors from 'cors';

import { retornaListaMedicos,retornaMedicoPorID,apagaUsuario } from './service/service.js';

const app = express();

app.use(cors());
app.use(express.json());


app.get('/medicos',async (req,res)=>{

    res.json(await retornaListaMedicos())
})

app.get('/medicos/:id', async (req,res)=>{

    let id = req.params.id;

    const regExp =/^\d+$/;

    if(!regExp.test(id)){
        res.status(406).json({ mensagem : `Digite apenas numeros`});
        return
    }

    const resultadoID = await retornaMedicoPorID(parseInt(id));

    if(resultadoID.length > 0){
        res.json(resultadoID);
    }
    else{
        res.status(404).json({mensagem : `Usuario não encontrado`})
    }
    
})


app.delete('/medicos/:id',async(req,res)=>{

    let id = req.params.id;
    
    const regExp = /^\d+$/;

    if(!regExp.test((id))){
        res.status(406).json({mensagem : `Valor digitado invalido`});
        return
    }

    const apagausuarioBD = await apagaUsuario(parseInt(id));

    if(apagausuarioBD > 0){
        res.status(200).json({mensagem :` Usuario do ID ${id} excluido com sucesso`})
        return
    }
    else{
        res.status(404).json({mensagem : `usuario do id ${id}, não encontrado`})
        return
    }

})
app.listen(3001, async()=>{
    console.log("Servidor iniciado na port 3001");
})