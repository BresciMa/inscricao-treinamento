
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



export class FormularioComponent {
  
  constructor(private http: HttpClient) {
    this.mensagemValidacao = "";

    this.profileForm.controls.email.setValue("bresciani@gmail.com");
    this.profileForm.controls.firstName.setValue("Marcelo");
    this.profileForm.controls.lastName.setValue("Jose Bresciani");
    this.profileForm.controls.whatsapp.setValue("11 984085194");
    this.profileForm.controls.vipId.setValue("1234");

    this.profileForm.controls.informacoesLegais.setValue(true);
    this.profileForm.controls.politicaCancelamentoEUsoDeImagem.setValue(true);

  }

  mensagemValidacao : string;

  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    whatsapp: new FormControl('', [Validators.minLength(5), Validators.required]),
    vipId: new FormControl('' ),  //[Validators.required, Validators.maxLength(4), Validators.minLength(4), Validators.pattern("^[0-9]*$")]
    informacoesLegais: new FormControl(false),
    politicaCancelamentoEUsoDeImagem: new FormControl(false),
    inscricaoLista: new FormControl(true)
  });

  ngOnIit(){
    this.mensagemValidacao = "";

    console.log("Chamando API");

  }

  validacao(){
    this.mensagemValidacao = "";

    if ( !this.profileForm.controls.informacoesLegais.value ){
      this.mensagemValidacao  = this.mensagemValidacao  + "Para continuar você precisa concordar com os Termos da Inscrição VIP. - ";
    }
    if ( !this.profileForm.controls.politicaCancelamentoEUsoDeImagem.value  ){
      this.mensagemValidacao  = this.mensagemValidacao  + "Para continuar você precisa concordar com a Política de Cancelamento e do Uso de Imagem. - ";
    }

    if (this.mensagemValidacao != ""){
      return false;
    }
    return true;    
  }


  onSubmit() {
    // TODO: Use EventEmitter with form value

    console.log(this.validacao());    
    
    console.warn(this.profileForm.value);

    var dataForm = this.profileForm.value;

    		// API Call
		let headers = 
      //{ 'Content-Type': 'application/json' }
      { 
        'Content-Type': 'text/html',
        //'Access-Control-Allow-Origin' : 'http://localhost:4200',
        //'Access-Control-Allow-Credentials' : 'true',

        'Access-Control-Allow-Origin':  'http://127.0.0.1:4200',
        'Access-Control-Allow-Methods': 'POST, GET',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'

      }
    ;

    //headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //headers.append('Access-Control-Allow-Credentials', 'true');

		this.http
			.get<any>('https://script.google.com/macros/s/AKfycbzBM9kOf2bzSR9zgwod8fjsugPCPfDK2RjgrWFl8gMaXrYEZYzKkXY1cYoM6kpEleM/exec', 
      {
				headers: headers
			})
			.subscribe(data => {
				console.log(data);
			});

  }




  

}