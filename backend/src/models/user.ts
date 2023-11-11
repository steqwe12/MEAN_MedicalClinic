import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
    korisnickoIme: {
        type: String
    },
    lozinka: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    adresa: {
        type: String
    },
    kontaktTelefon: {
        type: String
    },
    email: {
        type: String
    },
    brLekarskeLic: {
        type: String
    },
    specijalizacija: {
        type: String
    },
    ogranakOrdinac: {
        type: String
    },
    tip: {
        type: String
    },
    slika: {
        type: String
    }
})

export default mongoose.model('UserModel', User, 'korisnici');