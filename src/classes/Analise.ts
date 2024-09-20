import Instituicao from "Instituicao";
import Parametro from "Parametro";
import Municipio from "Municipio";

class Analise {
  id: number;
  coleta: Tempo;
  idColeta: null;
  anoColeta: number;
  mesColeta: number;
  diaColeta: number;
  dsMesColeta: string;
  dataColeta: Date;
  semestreColeta: number;
  trimestreColeta: number;

  instituicao: Instituicao;
  parametro: Parametro;
  municipio: Municipio;
  idProcedencia: number;
  dsProcedencia: string;
  idPontoDeColeta: number;
  dsPontoDeColeta: string;
  idPontoDeMonitoramento: number;
  dsPontoDeMonitoramento: string;
  idMotivo: number;
  dsMotivo: string;
  responsavel: string;
  descricaoResultado: string;
  identificacao: string;
  ld: string;
  lq: string;
  resultado: string;
  descricaoResultado: string;
}
