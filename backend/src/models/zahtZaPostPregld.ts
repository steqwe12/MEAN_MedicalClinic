import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let ZahtPostojePregledi = new Schema({
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

export default mongoose.model('ZahtPostojePreglediModel', ZahtPostojePregledi, 'zahteviZAPostPregl');