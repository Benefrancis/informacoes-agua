export default class Tempo {
  id: number;
  ano: number;
  mes: number;
  dia: number;
  semestre: number;
  trimestre: number;

  constructor(
    id: number = 0,
    ano: number = new Date().getFullYear() - 2,
    mes: number = 0,
    dia: number = 0,
    semestre: number = 0,
    trimestre: number = 0
  ) {
    this.id = id;
    this.ano = ano;
    this.mes = mes;
    this.dia = dia;
    this.semestre = semestre;
    this.trimestre = trimestre;
  }
}
