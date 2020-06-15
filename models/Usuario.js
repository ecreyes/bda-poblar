const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const usuarioSchema = new Schema({
    nombre_usuario:{
        type:String
    },
    cuenta_facebook:{
      type:String
    },
    nombre:{
      type:"String"
    },
    apellido:{
      type:String
    },
    nacionalidad:{
      type:String
    },
    fecha_registro:{
      type:Date
    },
    jugadores:[{ type: Schema.Types.Mixed}]
});

module.exports = mongoose.model('Usuario',usuarioSchema);