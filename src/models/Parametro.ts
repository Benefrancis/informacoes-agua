export default class Parametro {
  id: number;
  nome: string;
  descricao: string;
  vmp: string;
  uso: string;
  riscoHomem: string;
  riscoAmbiental: string;
  fonte: string;

  constructor(
    id: number,
    nome: string,
    descricao: string,
    vmp: string,
    uso: string,
    riscoHomem: string,
    riscoAmbiental: string,
    fonte: string
  ) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.vmp = vmp;
    this.uso = uso;
    this.riscoHomem = riscoHomem;
    this.riscoAmbiental = riscoAmbiental;
    this.fonte = fonte;
  }
}
