import { Component,OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user_services/user.service';

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
   ngOnInit():void{

   }
 
   constructor(private formBuilder: FormBuilder, public userService:UserService){
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
     const{email,password}=this.LoginForm.value
     this.userService.loginUser({
      "email":email,
      "password":password
     }).subscribe((result)=>{console.log(result);},(error)=>{console.log(error);})
     console.log(this.LoginForm.value);
   }
 
}

