import Municipio from "./Municipio"; // Certifique-se de ajustar o caminho conforme necessário
import Parametro from "./Parametro"; // Supondo que Parametro também seja importado de outro arquivo

export default class Informacao {
  "id": number;
  "ano": number;
  "semestre": number;
  "parametro": Parametro;
  "municipio": Municipio;
  "analises": number;

  constructor(
    id: number,
    ano: number,
    semestre: number,
    parametro: Parametro,
    municipio: Municipio,
    analises: number
  ) {
    this.id = id;
    this.ano = ano;
    this.semestre = semestre;
    this.parametro = parametro;
    this.municipio = municipio;
    this.analises = analises;
  }
}
