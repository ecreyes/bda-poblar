const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const jugadorSchema = new Schema({
    nombre:{
        type:String
    },
    precio:{
      type:Number
    }
});

module.exports = mongoose.model('Jugador',jugadorSchema);