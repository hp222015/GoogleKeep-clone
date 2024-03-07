import { Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
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
 
   constructor(private formBuilder: FormBuilder, public userService:UserService, public router: Router){
     this.LoginForm =this.formBuilder.group({
       email:["",[Validators.required,Validators.email]],
       password:["",[Validators.required,Validators.minLength(6)]],
     });
   }
 // below is the getter function by creating this we will be easily able to access what values are
 // typed inside the input text  column of different fields using f.email, f.password
 // and we have used it in template to apply validations using ngif f?. like this so that f signifies this 
 // getter function
   get f(){
     return this.LoginForm.controls
   }
 
   LoginUser(){
     this.submitted=true;
     const{email,password}=this.LoginForm.value
     this.userService.loginUser({

      // also here we can't get email from getter function throught f.email because it is outside the
      // getter function
      "email":email,
      "password":password
     }).subscribe((result: any)=>{
      // typescript doesn't directly allow to access the fields inside result like id using result.id
      // but here it is working because we have defined result type as any else we need to create interface
      // for that like this
      //interface LoginResponse {
      //  id: string;
      // Other properties if present in the response
      //    }
      console.log(result);
      localStorage.setItem("token",result.id)
      this.router.navigate(["/dashboard/notes"])
    },
    (error)=>{console.log(error);})
     console.log(this.LoginForm.value);
   }
   
}

