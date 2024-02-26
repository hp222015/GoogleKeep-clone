import { Component,OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  host: {

    class:"app-register-cnt"
  }
})
export class RegisterComponent {

  RegisterForm !: FormGroup
  submitted: boolean = false
  
  ngOnInit():void{

  }

  constructor(private formBuilder: FormBuilder, public userService:UserService){
    this.RegisterForm =this.formBuilder.group({
      firstName:["",[Validators.required,Validators.minLength(3)]],
      lastName:["",[Validators.required,Validators.minLength(3)]],
      userName:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.minLength(6)]]
    });
  }

  get f(){
    return this.RegisterForm.controls
  }

  registerUser(){
    this.submitted=true;
    if (this.RegisterForm.invalid){
      return;
    }
    const{firstName,lastName,userName,password}=this.RegisterForm.value
    
    this.userService.registerUser({
      "firstName":firstName,
      "lastName":lastName,
      "service":"advance",
      "email":userName,
      "password":password
      
    }).subscribe((result)=>{console.log(result);},(error)=>{console.log(error);})
    console.log(this.RegisterForm.value);
  }
}

