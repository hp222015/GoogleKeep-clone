import { Component,OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder){
    this.RegisterForm =this.formBuilder.group({
      firstName:["",[Validators.required,Validators.minLength(3)]],
      lastName:["",[Validators.required,Validators.minLength(3)]],
      userName:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.minLength(6)]],
      cnf_pswd: ["", Validators.required, this.passwordMatchValidator]
    });
  }

  get f(){
    return this.RegisterForm.controls
  }

  registerUser(){
    this.submitted=true;
    console.log(this.RegisterForm.value);
    if (this.RegisterForm.invalid){
      return;
    }
  }


  passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const confirmPassword = control.get('cnf_pswd');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }
}

