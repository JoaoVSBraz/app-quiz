import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Pessoa } from "../model/pessoa";

@Injectable({
  providedIn: 'root'
})

export class PessoaService {

  private URL_API = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  create(pessoa: Pessoa) {
    return this.http.post<Pessoa[]>(this.URL_API + '/pessoa', pessoa);
  }

  update(pessoa: Pessoa) {
    return this.http.put<Pessoa[]>(this.URL_API + '/pessoa/' + pessoa.id, pessoa)
  }

  findAll() {
    return this.http.get<Pessoa[]>(this.URL_API + '/pessoa');
  }

  delete(id: number) {
    return this.http.delete(this.URL_API + '/pessoa/' + id);
  }

}