import zakazaniPregled from "./zakazanipregledi";

export default class zakazaniPregledIOgranak {
    zakazaniPregled: zakazaniPregled;
    ogranak:string;

    constructor(zakazaniPregled: zakazaniPregled,ogranak:string){
        this.zakazaniPregled=zakazaniPregled;
        this.ogranak=ogranak;
    }
}
