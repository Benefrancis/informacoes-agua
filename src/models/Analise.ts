import Instituicao from "./Instituicao";
import Parametro from "./Parametro";
import Municipio from "./Municipio";
import Tempo from "./Tempo"; 

export default class Analise {
  id: number;
  coleta: Tempo;
  idColeta: number | null = null;
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
  identificacao: string;
  ld: string;
  lq: string;
  resultado: string;
  descricaoResultado: string;

  constructor(
    id: number,
    coleta: Tempo,
    anoColeta: number,
    mesColeta: number,
    diaColeta: number,
    dsMesColeta: string,
    dataColeta: Date,
    semestreColeta: number,
    trimestreColeta: number,
    instituicao: Instituicao,
    parametro: Parametro,
    municipio: Municipio,
    idProcedencia: number,
    dsProcedencia: string,
    idPontoDeColeta: number,
    dsPontoDeColeta: string,
    idPontoDeMonitoramento: number,
    dsPontoDeMonitoramento: string,
    idMotivo: number,
    dsMotivo: string,
    responsavel: string,
    identificacao: string,
    ld: string,
    lq: string,
    resultado: string,
    descricaoResultado: string
  ) {
    this.id = id;
    this.coleta = coleta;
    this.idColeta = null; // Pode ser atualizado posteriormente
    this.anoColeta = anoColeta;
    this.mesColeta = mesColeta;
    this.diaColeta = diaColeta;
    this.dsMesColeta = dsMesColeta;
    this.dataColeta = dataColeta;
    this.semestreColeta = semestreColeta;
    this.trimestreColeta = trimestreColeta;
    this.instituicao = instituicao;
    this.parametro = parametro;
    this.municipio = municipio;
    this.idProcedencia = idProcedencia;
    this.dsProcedencia = dsProcedencia;
    this.idPontoDeColeta = idPontoDeColeta;
    this.dsPontoDeColeta = dsPontoDeColeta;
    this.idPontoDeMonitoramento = idPontoDeMonitoramento;
    this.dsPontoDeMonitoramento = dsPontoDeMonitoramento;
    this.idMotivo = idMotivo;
    this.dsMotivo = dsMotivo;
    this.responsavel = responsavel;
    this.identificacao = identificacao;
    this.ld = ld;
    this.lq = lq;
    this.resultado = resultado;
    this.descricaoResultado = descricaoResultado;
  }
}
