import express from 'express';
import { UserController } from '../controllers/user.controller';
const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)

userRouter.route('/getUser').post(
    (req, res) => new UserController().getUser(req, res)
)

userRouter.route('/dohvatiKorisnikePoTipu').post(
    (req, res) => new UserController().dohvatiKorisnikePoTipu(req, res)
)

userRouter.route('/promeniLozinku').post(
    (req, res) => new UserController().promeniLozinku(req, res)
)

userRouter.route('/dohvatiKorisnikeZaUsername').post(
    (req, res) => new UserController().dohvatiKorisnikeZaUsername(req, res)
)

userRouter.route('/dohvatiKorisnikeZaEmail').post(
    (req, res) => new UserController().dohvatiKorisnikeZaEmail(req, res)
)

userRouter.route('/registruj').post(
    (req, res) => new UserController().registruj(req, res)
)


userRouter.route('/getVrstePregleda').post(
    (req, res) => new UserController().getVrstePregleda(req, res)
)


userRouter.route('/getZakazanePreglede').post(
    (req, res) => new UserController().getZakazanePreglede(req, res)
)


userRouter.route('/zakaziPregled').post(
    (req, res) => new UserController().zakaziPregled(req, res)
)

userRouter.route('/dohvatiIzvestaje').post(
    (req, res) => new UserController().dohvatiIzvestaje(req, res)
)


userRouter.route('/dohvatiZakPreglede').post(
    (req, res) => new UserController().dohvatiZakPreglede(req, res)
)

userRouter.route('/dohvatiSveLekare').post(
    (req, res) => new UserController().dohvatiSveLekare(req, res)
)

userRouter.route('/otkaziPregled').post(
    (req, res) => new UserController().otkaziPregled(req, res)
)

userRouter.route('/getSvePostojePreglediZaSpec').post(
    (req, res) => new UserController().getSvePostojePreglediZaSpec(req, res)
)

userRouter.route('/getSveObavljaPregledeZaIme').post(
    (req, res) => new UserController().getSveObavljaPregledeZaIme(req, res)
)

userRouter.route('/dodajUObavljaPreglede').post(
    (req, res) => new UserController().dodajUObavljaPreglede(req, res)
)

userRouter.route('/getZakPregZaPacLek').post(
    (req, res) => new UserController().getZakPregZaPacLek(req, res)
)

userRouter.route('/unesiIzvestaj').post(
    (req, res) => new UserController().unesiIzvestaj(req, res)
)

userRouter.route('/proslediZahtev').post(
    (req, res) => new UserController().proslediZahtev(req, res)
)

userRouter.route('/obrisiKorisnika').post(
    (req, res) => new UserController().obrisiKorisnika(req, res)
)

userRouter.route('/updatePacijenta').post(
    (req, res) => new UserController().updatePacijenta(req, res)
)

userRouter.route('/updateLekara').post(
    (req, res) => new UserController().updateLekara(req, res)
)

userRouter.route('/dodajLekara').post(
    (req, res) => new UserController().dodajLekara(req, res)
)

userRouter.route('/dohvSveZahteveRegist').post(
    (req, res) => new UserController().dohvSveZahteveRegist(req, res)
)

userRouter.route('/obrisiZahtevRegistr').post(
    (req, res) => new UserController().obrisiZahtevRegistr(req, res)
)

userRouter.route('/ubaciUZabranjene').post(
    (req, res) => new UserController().ubaciUZabranjene(req, res)
)

userRouter.route('/ubaciUKorisnike').post(
    (req, res) => new UserController().ubaciUKorisnike(req, res)
)

userRouter.route('/dohvSveZahteveZaPostPregl').post(
    (req, res) => new UserController().dohvSveZahteveZaPostPregl(req, res)
)

userRouter.route('/deleteZZPP').post(
    (req, res) => new UserController().deleteZZPP(req, res)
)

userRouter.route('/putPostPreg').post(
    (req, res) => new UserController().putPostPreg(req, res)
)

userRouter.route('/dohvSvePostojePregledi').post(
    (req, res) => new UserController().dohvSvePostojePregledi(req, res)
)

userRouter.route('/dodNovPostPreg').post(
    (req, res) => new UserController().dodNovPostPreg(req, res)
)

userRouter.route('/dlt').post(
    (req, res) => new UserController().dlt(req, res)
)

userRouter.route('/updtNaz').post(
    (req, res) => new UserController().updtNaz(req, res)
)

userRouter.route('/updtCena').post(
    (req, res) => new UserController().updtCena(req, res)
)

userRouter.route('/dohvatiSveZabranjene').post(
    (req, res) => new UserController().dohvatiSveZabranjene(req, res)
)

export default userRouter;