import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from'./register.component'
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user_services/user.service';

// beforeEach(async () => {
//   await TestBed.configureTestingModule({
//     declarations: [ LoginComponent ],
//     imports: [ ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule ], // Add HttpClientTestingModule here
//     providers: [
//       FormBuilder,
//       { provide: UserService, useValue: userServiceSpy }
//     ]
//   })
//   .compileComponents();

//   userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
// });


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async() => {
  userServiceSpy = jasmine.createSpyObj('UserService', ['registerUser']);
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports:[ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
                  FormBuilder,
                  { provide: UserService, useValue: userServiceSpy }
                ]
    }).compileComponents();    
  });
  beforeEach(()=>{
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
});