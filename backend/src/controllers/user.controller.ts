import * as express from 'express';
import UserModel from '../models/user'
import ZahtevModel from '../models/zahtevi'
import ObavljaPregledeModel from '../models/obavpregld'
import ZakazaniPregledModel from '../models/zakazanipregl'
import IzvestajiModel from '../models/izvestaji'
import PostojePreglediModel from '../models/postojepregledi'
import ZahtPostojePreglediModel from '../models/zahtZaPostPregld'
import ZahtevRegistrModel from '../models/zahtZaRegistr'
import ZabranjeniModel from '../models/zabranjeni'

export class UserController {
    login = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;
        
        UserModel.findOne({ 'korisnickoIme': korisnickoIme, 'lozinka': lozinka}, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    getUser = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;

        UserModel.findOne({ 'korisnickoIme': korisnickoIme }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    dohvatiKorisnikePoTipu = (req: express.Request, res: express.Response)=>{
        let tip = req.body.tip;
        UserModel.find({'tip': tip}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
       })
    }

    promeniLozinku = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let novaLozinka = req.body.novaLozinka;

        UserModel.updateOne({'korisnickoIme': korisnickoIme}, {$set: {'lozinka': novaLozinka}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'updated'})
        })
    }

    dohvatiKorisnikeZaUsername = (req: express.Request, res: express.Response)=>{
        let korisnickoIme = req.body.korisnickoIme;
        UserModel.find({'korisnickoIme': korisnickoIme}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
       })
    }

    dohvatiKorisnikeZaEmail = (req: express.Request, res: express.Response)=>{
        let email = req.body.email;
        UserModel.find({'email': email}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
       })
    }



    registruj = (req: express.Request, res: express.Response) => {
        let zahtev = new ZahtevModel({
            korisnickoIme: req.body.korisnickoIme,
            lozinka: req.body.lozinka,
            ime: req.body.ime,
            prezime: req.body.prezime,
            adresa: req.body.adresa,
            kontaktTelefon: req.body.kontaktTelefon,
            email: req.body.email,
            slika: req.body.slika
        })

        zahtev.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }

    getVrstePregleda = (req: express.Request, res: express.Response) => {       
        let lekar = req.body.lekar;
        ObavljaPregledeModel.find({'korisnickoIme': lekar}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
       })       
    }

    getZakazanePreglede = (req: express.Request, res: express.Response) => {       
        let lekar = req.body.lekar;
        ZakazaniPregledModel.find({'lekar': lekar}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
       })       
    }

    zakaziPregled = (req: express.Request, res: express.Response) => {       
        let pregled = new ZakazaniPregledModel({
            lekar: req.body.lekar,
            naziv: req.body.naziv,
            trajanje: req.body.trajanje,
            cena: req.body.cena,
            vremeod: req.body.vremeod,
            vremedo: req.body.vremedo,
            pacijent: req.body.pacijent
        })

        pregled.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })  
    }

    dohvatiIzvestaje = (req: express.Request, res: express.Response) => {       
        let pacijent = req.body.pacijent;
        IzvestajiModel.find({'pacijent': pacijent}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
       })       
    }

    dohvatiZakPreglede = (req: express.Request, res: express.Response) => {       
        let pacijent = req.body.pacijent;
        ZakazaniPregledModel.find({'pacijent': pacijent}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
       })       
    }

    dohvatiSveLekare = (req: express.Request, res: express.Response) => {       
        let tip = req.body.tip;
        UserModel.find({'tip': tip}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
       })       
    }

    otkaziPregled = (req: express.Request, res: express.Response) => {       
        let lekar = req.body.lekar;
        let vremeod = req.body.vremeod;

        ZakazaniPregledModel.deleteOne({'lekar': lekar, 'vremeod':vremeod}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        }) 
    }

    getSvePostojePreglediZaSpec = (req: express.Request, res: express.Response) => {       
        let specijalizacija = req.body.specijalizacija;
        PostojePreglediModel.find({'specijalizacija': specijalizacija}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
       })       
    }

    getSveObavljaPregledeZaIme = (req: express.Request, res: express.Response) => {       
        let korisnickoIme = req.body.korisnickoIme;
        ObavljaPregledeModel.find({'korisnickoIme': korisnickoIme}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
       })       
    }

    dodajUObavljaPreglede = (req: express.Request, res: express.Response) => {       
        let obavpreg = new ObavljaPregledeModel({
            korisnickoIme: req.body.korisnickoIme,
            naziv: req.body.naziv,
            trajanje: req.body.trajanje,
            cena: req.body.cena,
        })

        obavpreg.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })  
    }

    getZakPregZaPacLek = (req: express.Request, res: express.Response) => {       
        let lekar = req.body.lekar;
        let pacijent = req.body.pacijent;

        ZakazaniPregledModel.find({'lekar': lekar,'pacijent':pacijent}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
       })       
    }



    unesiIzvestaj = (req: express.Request, res: express.Response) => {       
        let izvestaj = new IzvestajiModel({
            lekar: req.body.lekar,
            pacijent: req.body.pacijent,
            vremeod: req.body.vremeod,
            vremedo: req.body.vremedo,
            specijalizacija: req.body.specijalizacija,
            razlogDolaska: req.body.razlogDolaska,
            dijagnoza: req.body.dijagnoza,
            terapija: req.body.terapija,
            kontrola: req.body.kontrola,
        })

        izvestaj.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })     
    }

    proslediZahtev = (req: express.Request, res: express.Response) => {       
        let zahtev = new ZahtPostojePreglediModel({
            naziv: req.body.naziv,
            trajanje: req.body.trajanje,
            cena: req.body.cena,
            specijalizacija: req.body.specijalizacija
        })
        
        zahtev.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        }) 

    }

    obrisiKorisnika = (req: express.Request, res: express.Response) => {       
        let korisnickoIme = req.body.korisnickoIme;

        UserModel.deleteOne({'korisnickoIme': korisnickoIme}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })

    }

    updatePacijenta = (req: express.Request, res: express.Response) => {       
        let korisnickoIme = req.body.korisnickoIme;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let adresa = req.body.adresa;
        let telefon = req.body.telefon;
        let email = req.body.email;

        if (ime != "") {
            UserModel.collection.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'ime': ime } })
        }

        if (prezime != "") {
            UserModel.collection.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'prezime': prezime } })
        }

        if (adresa != "") {
            UserModel.collection.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'adresa': adresa } })
        }

        if (telefon != "") {
            UserModel.collection.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'kontaktTelefon': telefon } })
        }


        if (email != "") {
            UserModel.collection.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'email': email } })
        }

        
        res.json({ 'msg': 'ok' })
    }


    updateLekara = (req: express.Request, res: express.Response) => {       
        let korisnickoIme = req.body.korisnickoIme;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let adresa = req.body.adresa;
        let telefon = req.body.telefon;
        let email = req.body.email;
        let brleklic = req.body.brleklic;
        let spec = req.body.spec;
        let ogranak = req.body.ogranak;

        if (ime != "") {
            UserModel.collection.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'ime': ime } })
        }
        if (prezime != "") {
            UserModel.collection.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'prezime': prezime } })
        }
        if (adresa != "") {
            UserModel.collection.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'adresa': adresa } })
        }
        if (telefon != "") {
            UserModel.collection.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'kontaktTelefon': telefon } })
        }
        if (email != "") {
            UserModel.collection.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'email': email } })
        }
        if (brleklic != "") {
            UserModel.collection.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'brLekarskeLic': brleklic } })
        }
        if (spec != "") {
            UserModel.collection.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'specijalizacija': spec } })
        }
        if (ogranak != "") {
            UserModel.collection.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'ogranakOrdinac': ogranak } })
        }

        

        
        res.json({ 'msg': 'ok' })
    }

    dodajLekara = (req: express.Request, res: express.Response) => {       
        let lekar = new UserModel({
            korisnickoIme: req.body.korisnickoIme,
            lozinka: req.body.lozinka,
            ime: req.body.ime,
            prezime: req.body.prezime,
            adresa: req.body.adresa,
            kontaktTelefon: req.body.kontaktTelefon,
            email: req.body.email,
            brLekarskeLic: req.body.brLekarskeLic,
            specijalizacija: req.body.specijalizacija,
            ogranakOrdinac: req.body.ogranakOrdinac,
            tip: req.body.tip,
            slika: req.body.slika
        })

        lekar.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })     
    }


    dohvSveZahteveRegist = (req: express.Request, res: express.Response) => {       


        ZahtevRegistrModel.find({}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
       })       
    }


    obrisiZahtevRegistr = (req: express.Request, res: express.Response) => {       
        let korisnickoIme = req.body.korisnickoIme;
        let email = req.body.email;

        UserModel.deleteOne({'korisnickoIme': korisnickoIme,'email':email}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })      
    }

    ubaciUZabranjene = (req: express.Request, res: express.Response) => {
        let zabr = new ZabranjeniModel({       
        korisnickoIme :req.body.korisnickoIme,
        email : req.body.email
        })

        zabr.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        }) 
    }

    ubaciUKorisnike = (req: express.Request, res: express.Response) => {
        let usr = new UserModel({       
        korisnickoIme :req.body.korisnickoIme,
        lozinka : req.body.lozinka,
        ime : req.body.ime,
        prezime : req.body.prezime,
        adresa : req.body.adresa,
        kontaktTelefon : req.body.kontaktTelefon,
        email : req.body.email,
        brLekarskeLic : null,
        specijalizacija : null,
        ogranakOrdinac : null,
        tip : "pacijent",
        slika : req.body.slika,
        })

        usr.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        }) 
    }


    dohvSveZahteveZaPostPregl = (req: express.Request, res: express.Response) => {       
        ZahtPostojePreglediModel.find({}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
       })       
    }

    deleteZZPP = (req: express.Request, res: express.Response) => {       
        let naziv = req.body.naziv;
        let trajanje = req.body.trajanje;
        let cena = req.body.cena;
        let specijalizacija = req.body.specijalizacija;

        ZahtPostojePreglediModel.deleteOne({'naziv': naziv,'trajanje':trajanje,'cena':cena,'specijalizacija':specijalizacija}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })      
    }

    putPostPreg = (req: express.Request, res: express.Response) => {
        let postpreg = new PostojePreglediModel({       
            naziv :req.body.naziv,
            trajanje : req.body.trajanje,
            cena : req.body.cena,
            specijalizacija : req.body.specijalizacija
        })

        postpreg.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        }) 
    }

    dohvSvePostojePregledi = (req: express.Request, res: express.Response) => {
        PostojePreglediModel.find({}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
       }) 
    }

    dodNovPostPreg = (req: express.Request, res: express.Response) => {
        let postpreg = new PostojePreglediModel({       
            naziv :req.body.naziv,
            trajanje : req.body.trajanje,
            cena : req.body.cena,
            specijalizacija : req.body.specijalizacija
        })

        postpreg.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        }) 
    }

    dlt = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        let trajanje = req.body.trajanje;
        let cena = req.body.cena;
        let specijalizacija = req.body.specijalizacija;

        PostojePreglediModel.deleteOne({'naziv': naziv,'trajanje':trajanje,'cena':cena,'specijalizacija':specijalizacija}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        }) 
    }



    updtNaz = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        let trajanje = req.body.trajanje;
        let cena = req.body.cena;
        let specijalizacija = req.body.specijalizacija;
        let procitNaziv = req.body.procitNaziv;

        PostojePreglediModel.updateOne({ 'naziv': naziv,'trajanje':trajanje,'cena':cena,'specijalizacija':specijalizacija }, { $set: { 'naziv': procitNaziv } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'message': 'updated' })
        })

    }

    updtCena = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        let trajanje = req.body.trajanje;
        let cena = req.body.cena;
        let specijalizacija = req.body.specijalizacija;
        let procitCena = req.body.procitCena;

        PostojePreglediModel.updateOne({ 'naziv': naziv,'trajanje':trajanje,'cena':cena,'specijalizacija':specijalizacija }, { $set: { 'cena': procitCena } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'message': 'updated' })
        })

    }

    dohvatiSveZabranjene = (req: express.Request, res: express.Response) => {
        ZabranjeniModel.find({}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
       }) 

    }
    


}