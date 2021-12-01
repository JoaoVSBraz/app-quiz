import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pessoa } from './model/pessoa';
import { PessoaService } from './service/pessoa.service';
import { Pergunta } from './model/pergunta';
import { PerguntaService } from './service/pergunta.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  displayedColumns: string[] = ['id', 'nome', 'acoes'];
  displayedColumnsPergunta: string[] = ['id', 'titulo', 'acoes'];
  dataSource;
  dataSourcePergunta;
  mostrarFormulario = false;
  pessoa: Pessoa = new Pessoa();

  constructor(private service: PessoaService, private servicePergunta: PerguntaService) {
  }

  ngOnInit(): void {
    this.findAll();
    this.findAllPergunta();
  }

  editar(element) {
    this.mostrarFormulario = true;
    this.pessoa = element;
  }

  delete(id) {
    this.service.delete(id).subscribe(
      (response) => {
        this.findAll();
      },
      (response) => {
        alert("Erro!");
      }
    );
  }

  findAll() {
    this.service.findAll().subscribe(
      (response) => {
        //alert('Sucesso!');
        this.dataSource = new MatTableDataSource<Pessoa>(response);
      },
      (response) => {
        alert('Erro!');
      }
    );
  }

  findAllPergunta() {
    this.servicePergunta.findAll().subscribe(
      (response) => {
        // alert('sucesso!');
        // var perguntas = response._embedded;
        this.dataSourcePergunta = new MatTableDataSource<Pergunta>(response);
        console.info(response);
      },
      (response) => {
        alert("Erro!");
      }
    );
  }

  salvar() {
    if (this.pessoa.id) {
      this.atualizarNoBanco();
    } else {
      this.criarNoBanco();
    }
  }

  atualizarNoBanco() {
    this.service.update(this.pessoa).subscribe(
      (response) => {
        this.findAll();
        this.mostrarFormulario = false;
      },
      (response) => {
        alert("Erro!");
      }
    );
  }

  criarNoBanco() {
    this.service.create(this.pessoa).subscribe(
      (response) => {
        this.findAll();
        this.mostrarFormulario = false;
      },
      (response) => {
        alert("Erro!")
      }
    );
  }

  novaPessoa() {
    this.mostrarFormulario = true;
    this.pessoa = new Pessoa();
  }
}