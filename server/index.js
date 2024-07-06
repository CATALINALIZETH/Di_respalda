const express = require("express");
const app=express();
const mysql=require("mysql");
const cors=require("cors");

app.use(cors());
app.use(express.json());//toda la info va a pasar a ser un json

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"usuarios"
});

app.post("/create",async (req,res)=>{
    const nombre = req.body.nombre; //post/auth/register
    const correo = req.body.correo; //post/auth/register
    const contrasena = req.body.contrasena; //post/auth/register
    //const contrasena = await bcrypt.hash(contrasena, 10);

    db.query('INSERT INTO usuarios_libreria(nombre,correo,password) VALUES(?,?,?)',[nombre, correo, contrasena],
        (err, result)=>{ //capta rl error o resultado
            if(err){
                console.log(err);//para que en consola muestre el error
            }else{
                res.send("Usuario registrado con éxito :)");
            }
        }
    );
    //para guardar la información del formulario
});

app.post("/create",async (req,res)=>{
    const nombre = req.body.nombre; //post/auth/register
    const correo = req.body.correo; //post/auth/register
    const contrasena = req.body.contrasena; //post/auth/register
    //const contrasena = await bcrypt.hash(contrasena, 10);

    db.query('INSERT INTO usuarios_libreria(nombre,correo,password) VALUES(?,?,?)',[nombre, correo, contrasena],
        (err, result)=>{ //capta rl error o resultado
            if(err){
                console.log(err);//para que en consola muestre el error
            }else{
                res.send("Usuario registrado con éxito :)");
            }
        }
    );
    //para guardar la información del formulario
});

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001") //antes 3001
})