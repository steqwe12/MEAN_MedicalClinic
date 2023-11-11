import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Obprg = new Schema({
    korisnickoIme: {
        type: String
    },
    naziv: {
        type: String
    },
    trajanje: {
        type: Number
    },
    cena: {
        type: Number
    }
})

export default mongoose.model('ObavljaPregledeModel', Obprg, 'obavljaPreglede');