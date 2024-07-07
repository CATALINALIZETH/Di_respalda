const express = require("express");
const app=express();
const mysql=require("mysql");
const cors=require("cors");
const bcrypt = require("bcryptjs"); // Agregar bcrypt
const jwt = require("jsonwebtoken"); 

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
    let contrasena = req.body.contrasena; //post/auth/register
    contrasena = await bcrypt.hash(contrasena, 10);

    db.query('INSERT INTO usuarios(nombre,correo,password) VALUES(?,?,?)',[nombre, correo, contrasena],
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

app.get("/usuarios",async (req,res)=>{
    db.query('SELECT * FROM usuarios' ,
        (err, result)=>{ //capta rl error o resultado
            if(err){
                console.log(err);//para que en consola muestre el error
            }else{
                res.send(result);
            }
        }
    );
    //para guardar la información del formulario
});

app.post("/login", async (req, res) => {
    const correo = req.body.correo;
    const contrasena = req.body.contrasena;

    db.query('SELECT * FROM usuarios WHERE correo = ?', [correo], async (err, result) => {
        if (err) {
            res.send({ err: err });
        }

        if (result.length > 0) {
            const isMatch = await bcrypt.compare(contrasena, result[0].password);
            if (isMatch) {
                // Generar un token de autenticación
                const token = jwt.sign({ id: result[0].id }, 'secret_key', { expiresIn: '1h' });
                res.json({ auth: true, token: token });
            } else {
                res.json({ auth: false, message: "Usuario o Contraseña incorrectos" });
            }
        } else {
            res.json({ auth: false, message: "No existe el usuario" });
        }
    });
});

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001") //antes 3001
})