import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let PostojePregledi = new Schema({
    naziv: {
        type: String
    },
    trajanje: {
        type: Number
    },
    cena: {
        type: Number
    },
    specijalizacija: {
        type: String
    }
})

export default mongoose.model('PostojePreglediModel', PostojePregledi, 'postojePregledi');