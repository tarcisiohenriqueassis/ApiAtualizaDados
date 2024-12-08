import mysql from 'mysql2/promise';

 export const Pool = mysql.createPool({
    host:"localhost",
    user:"usuario_bd_medicos",
    password:"123456",
    database:"bd_medicos"
 })