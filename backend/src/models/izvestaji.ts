import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Izvestaji = new Schema({
    lekar: {
        type: String
    },
    pacijent: {
        type: String
    },
    vremeod: {
        type: String
    },
    vremedo: {
        type: String
    },
    specijalizacija: {
        type: String
    },
    razlogDolaska: {
        type: String
    },
    dijagnoza: {
        type: String
    },
    terapija: {
        type: String
    },
    kontrola: {
        type: String
    },
})

export default mongoose.model('IzvestajiModel', Izvestaji, 'izvestaji');