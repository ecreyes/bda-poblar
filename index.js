const mongoose = require('mongoose');
const DateGenerator = require('random-date-generator');

const Usuario = require("./models/Usuario");
const Jugador = require("./models/Jugador");
const Partido = require("./models/Partido");

//40*50 users tinenen 15 jugadores-> 30.000 jugadores
//25*50 users tienen 24 jugadores -> 30.000 jugadores
//se necesitan 60.000 jugadores y 3.250 usuarios


const crearJugadores = async (cantidad) => {
  for (let i = 1; i <= cantidad; i++) {
    let myJugador = new Jugador({
      nombre: `jugador-${i}`,
      precio: i * 1000
    });
    await myJugador.save();
  }
  console.log("jugadores creados!", cantidad);
}

const crearUsuarios = async () => {
  Jugador.find(async (error, usuariosDB) => {
    if (error) {
      console.log("Ocurrio un error al cargar jugadores");
      return;
    }
    else {
      let contador = 1;
      let mylist = [];
      let paises = ["Chile", "Argentina", "Peru", "Bolivia", "Brasil"];
      let startDate = new Date(2017, 1, 1);
      let endDate = new Date(2020, 3, 3);
      let modulo =15;
      for (let i = 1; i < usuariosDB.length; i++) {
        mylist.push(usuariosDB[i]._id);
        if (i % modulo == 0) {
          let myUser = new Usuario({
            nombre_usuario: `usuario-${contador}`,
            cuenta_facebook: `usuario-${contador}-fb`,
            nombre: `nombre-usuario-${contador}`,
            apellido: `apellido-usuario-${contador}`,
            nacionalidad: `${paises[Math.floor(Math.random() * paises.length)]}`,
            fecha_registro: DateGenerator.getRandomDateInRange(startDate, endDate),
            jugadores: mylist
          });
          await myUser.save();
          contador++;
          mylist = [];
        }
        if (contador == 500) {
          modulo = 24;
        }
        if(contador==1000){
          break;
        }
      }
      console.log("Usuarios creados!",contador);
      await crearPartidos(1500);
      return;
    }
  });
}



const crearPartidos = async (cantidad)=>{
  Usuario.find(async (error,usuariosDB)=>{
    let contador = 0;
    while(contador<cantidad){
      let usuario_1 = null;
      let usuario_2 = null;
      let startDate = new Date(2017, 1, 1);
      let endDate = new Date(2020, 3, 3);
      while(usuario_1==usuario_2){
        try{
          usuario_1 = usuariosDB[Math.floor(Math.random() * usuariosDB.length)]._id;
          usuario_2 = usuariosDB[Math.floor(Math.random() * usuariosDB.length)]._id;
        }
        catch(error){
          console.log(error);
        }
      }
      let resultado = []
      resultado.push(null);
      resultado.push(usuario_1);
      resultado.push(usuario_2);
      let myPartido = new Partido({
        fecha_partido: DateGenerator.getRandomDateInRange(startDate, endDate),
        usuario_1,
        usuario_2,
        ganador:resultado[Math.floor(Math.random() * resultado.length)]
      });
      await myPartido.save();
      contador++;
      resultado = [];
    }
    console.log("Partidos creados!",cantidad);
  });
}

//DB
mongoose.connect('mongodb://localhost:27017/BDA',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }, async (err, res) => {
    if (err) throw err;
    console.log("Conexión realizada correctamente");
    console.log("cargando la base de datos...")
    await crearJugadores(20000);
    await crearUsuarios();
  });