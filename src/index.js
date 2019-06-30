const express = require('express');
const app = express();
const path =require('path');
const morgan = require('morgan');
const mysql=require('mysql')
const connection= require('express-myconnection')

//importar rutas de usuarios
const usuarios = require('./routes/usuarios')

//settings
app.set('port', process.env.PORT || 4000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));


//middlewares, funciones antes de que se pidan datos 
app.use(morgan('dev'));//para saber que estan pidiendo
app.use(connection(mysql, {
    host:'localhost',
    user:'root',
    password:'SQL080498',
    port:'3306',
    database:'proyectobases'
},'single'))

app.use(express.urlencoded({extended: false}))

//routes 
app.use('/', usuarios)


//static files
app.use(express.static(path.join(__dirname,'public')))


//usando el server 
app.listen(app.get('port'), () =>{
    console.log('Server conectado');
});