
import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { Usuario } from './usuario'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
})


@Injectable()
export class FormularioComponent {

  mensagemValidacao: string;
  vipValidado: boolean;
  myResult: any;

  SituacaoInscricao = "";
  grupoInscricaoWhatsapp = "";

  numVagasWorkshop = 6;
  descNumVagasWorkshop = "";
  dataWorkshop = "";
  localWorkshop = "";
  grupoVendasWorkshop = "";

  constructor(
    private http: HttpClient
  ) {

    this.mensagemValidacao = "";
    this.vipValidado = false;

    this.SituacaoInscricao = "";

    this.obtemDadosBackend();

  }

  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    whatsapp: new FormControl('', [Validators.minLength(5), Validators.required]),
    vipId: new FormControl(''),  //[Validators.required, Validators.maxLength(4), Validators.minLength(4), Validators.pattern("^[0-9]*$")]
    informacoesLegais: new FormControl(false),
    politicaCancelamentoEUsoDeImagem: new FormControl(false),
    inscricaoLista: new FormControl(true)
  });

  ngOnIit() {
    this.mensagemValidacao = "";

    console.log("Chamando API");

  }

  validacao() {
    this.mensagemValidacao = "";

    if (!this.profileForm.controls.informacoesLegais.value) {
      this.mensagemValidacao = this.mensagemValidacao + "Para continuar você precisa concordar com os Termos da Inscrição VIP. - ";
    }
    if (!this.profileForm.controls.politicaCancelamentoEUsoDeImagem.value) {
      this.mensagemValidacao = this.mensagemValidacao + "Para continuar você precisa concordar com a Política de Cancelamento e do Uso de Imagem. - ";
    }

    if (this.mensagemValidacao != "") {
      return false;
    }
    return true;
  }


  obtemDadosBackend(){
    console.log(this.SituacaoInscricao);

    const urlGoogleBackEnd: string = 'https://script.google.com/macros/s/AKfycbyX34CLo-4Xl52Og4QKvZfPEuYbxo2-3fE63vUprH0V0xE_cWX9EBl6x1fKPjx1-Yc/exec';

    var result = this.http.get(urlGoogleBackEnd)
      .subscribe((data) => {

        this.myResult = JSON.parse(data.toString());

        console.log(this.myResult.SituacaoInscricao);

        this.SituacaoInscricao = this.myResult.SituacaoInscricao;

        this.numVagasWorkshop = Number(this.myResult.Vagas);
        this.dataWorkshop = this.myResult.DataEvento;
        this.localWorkshop = this.myResult.Local;
        this.grupoVendasWorkshop = this.myResult.GrupoVendas;

        if (this.numVagasWorkshop > 1){
          this.descNumVagasWorkshop = "" + this.numVagasWorkshop + " VAGAS";
        }else{
          this.descNumVagasWorkshop = "UMA VAGA";
        }
    })
  }


  onSubmit() {
    if (this.validacao()) {

      var dataForm = this.profileForm.value;
      const urlGoogleServer: string = 'https://script.google.com/macros/s/AKfycbx6xYopqkuvmgfymmgmugU1mNAsuIteJaEBk0vQ7xkSu1nvE8AJln_u_IvVeS6fEEY/exec';

      var headersOp = new HttpHeaders()
        .set('Content-Type', 'text/plain');

      console.log(dataForm);

      var result = this.http.post(urlGoogleServer, dataForm, { 'headers': headersOp })
        .subscribe((data) => {
          this.myResult = data;

          this.vipValidado = true;

        },(error) => {
          this.mensagemValidacao = "Um erro inesperado aconteceu - Por favor, avise o responsável pelo site."
        });

    }
  }
}