export default class Municipio {
  id: number | null = null;
  ibge: string | null = null;
  ibgeSemDigito: string | null = null;
  nomeMunicipio: string | null = null;
  nomeEstado: string | null = null;
  nomeEstadoSemAcento: string | null = null;
  siglaEstado: string | null = null;
  nomeRegiao: string | null = null;
  latitude: number | null = null;
  longitude: number | null = null;

  constructor(
    id: number | null = null,
    ibge: string | null = null,
    ibgeSemDigito: string | null = null,
    nomeMunicipio: string | null = null,
    nomeEstado: string | null = null,
    nomeEstadoSemAcento: string | null = null,
    siglaEstado: string | null = null,
    nomeRegiao: string | null = null,
    latitude: number | null = null,
    longitude: number | null = null
  ) {
    this.id = id;
    this.ibge = ibge;
    this.ibgeSemDigito = ibgeSemDigito;
    this.nomeMunicipio = nomeMunicipio;
    this.nomeEstado = nomeEstado;
    this.nomeEstadoSemAcento = nomeEstadoSemAcento;
    this.siglaEstado = siglaEstado;
    this.nomeRegiao = nomeRegiao;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
