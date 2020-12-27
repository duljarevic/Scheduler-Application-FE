export class SchedulerTask {

  id?: number;
  nazivIzdavaoca?: string;
  adresaIzdavaoca?: string;
  nazivPrimaoca?: string;
  adresaPrimaoca?: string;
  tekuciRacun?: string;
  pibIzdavaoca?: number;
  pibPrimaoca?: number;
  mestoIzdavanjaRacuna?: string;
  datumIzdavanjaRacuna?: Date;
  datumPrometaDobaraUsluga?: Date;
  vrstaDobraUsluge?: string;
  jedinicaMere?: string;
  kolicina?: string;
  cena?: string;
  poreskaOsnovica?: string;
  sptopaPDV?: string;
  iznosPDV?: number;
  tekuciRacunPrimaoca?: string;

  napomenaOPoreskomOslobodjenju?: string;


  constructor() {
  }
}

