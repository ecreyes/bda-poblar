const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let partidoSchema = new Schema({
  fecha_partido: {
    type: Date
  },
  usuario_1: {
    type: Schema.Types.ObjectId,
    ref: "Usuario"
  },
  usuario_2: {
    type: Schema.Types.ObjectId,
    ref: "Usuario"
  },
  ganador: {
    type: Schema.Types.ObjectId,
    ref: "Usuario"
  }
});

module.exports = mongoose.model('Partido', partidoSchema);