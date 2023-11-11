import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Zahtev = new Schema({
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
    slika: {
        type: String
    }
})

export default mongoose.model('ZahtevModel', Zahtev, 'zahteviZaRegistraciju');