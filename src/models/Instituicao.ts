export default class Instituicao {
  id: number;
  nome: string;
  sigla: string;

  constructor(id: number, nome: string, sigla: string) {
    this.id = id;
    this.nome = nome;
    this.sigla = sigla;
  }
}
