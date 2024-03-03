import { Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  host: {
//  host helps to attach a class to the component so that whenever 
//it is used somewhere it comes with the css of that class attached
//  and we don't need to write css for it again
    class:"app-register-cnt"
  }
})
export class RegisterComponent {

  RegisterForm !: FormGroup
  submitted: boolean = false

  // constructor and ngOnInit both are used for initialization but the difference is
  // The main difference between the constructor and ngOnInit is the timing of their execution:

// The constructor is executed when Angular creates an instance of the component.
// ngOnInit is executed after the constructor, once the component has been fully 
//initialized and all its input properties have been set.
// In summary, ngOnInit is a lifecycle hook in Angular that allows you to perform 
//initialization tasks after the component has been fully 
//initialized. It's commonly used to set up component properties, fetch initial data, 
//or perform other initialization logic.
  
  ngOnInit():void{

  }

  constructor(private formBuilder: FormBuilder, public userService:UserService, public router:Router){
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
    // destructuring is getting implemented below
    const{firstName,lastName,userName,password}=this.RegisterForm.value
    
    this.userService.registerUser({
      "firstName":firstName,
      "lastName":lastName,
      "service":"advance",
      "email":userName,
      "password":password
      
    }).subscribe((result)=>
                  {
                    console.log(result);
                    this.router.navigate(["/login"])
                  },
                  (error)=>
                  {
                    console.log(error);
                  })
    //The need for subscribing to these observables arises from the asynchronous nature
    // of HTTP requests. When you make an HTTP request, it takes some time for the server
    // to process the request and send back a response. During this time, your code continues
    // to execute, and you might want to perform certain actions once the response arrives. 
    //Subscribing to the observable allows you to do just that.
    console.log(this.RegisterForm.value);
  }
}

