import { Component,OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  host: {

    class:"app-login-cnt"
  }
})
export class LoginComponent {
   LoginForm !: FormGroup
   submitted: boolean =false

   userName!: string;
   pswd!: string;

   ngOnInit():void{

   }
 
   constructor(private formBuilder: FormBuilder){
     this.LoginForm =this.formBuilder.group({
       email:["",[Validators.required,Validators.email]],
       password:["",[Validators.required,Validators.minLength(6)]],
     });
   }
 
   get f(){
     return this.LoginForm.controls
   }
 
   LoginUser(){
     this.submitted=true;
   }
 
}

