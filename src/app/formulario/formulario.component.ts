
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


  constructor(
    private http: HttpClient
  ) {

    this.mensagemValidacao = "";
    this.vipValidado = false;

    /*
    this.profileForm.controls.email.setValue("bresciani@gmail.com");
    this.profileForm.controls.firstName.setValue("Marcelo");
    this.profileForm.controls.lastName.setValue("Jose Bresciani");
    this.profileForm.controls.whatsapp.setValue("11 984085194");
    this.profileForm.controls.vipId.setValue("1234");
    this.profileForm.controls.informacoesLegais.setValue(true);
    this.profileForm.controls.politicaCancelamentoEUsoDeImagem.setValue(true);
    */
   
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
          console.log("Rodando o método Subscribe");
          console.log(this.myResult.result);

          this.vipValidado = true;

        });

    }
  }
}