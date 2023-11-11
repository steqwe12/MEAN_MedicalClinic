import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let ZakazaniPregled = new Schema({
    lekar: {
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
    },
    vremeod: {
        type: String
    },
    vremedo: {
        type: String
    },
    pacijent: {
        type: String
    }
})

export default mongoose.model('ZakazaniPregledModel', ZakazaniPregled, 'zakazaniPregledi');