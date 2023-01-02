import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  ngOnInit(): void {}
  isLoading = false;
  error: string = "";

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm){
    console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    let tokenObs$: Observable<string>;

    tokenObs$ = this.authService.login(email, password);

    tokenObs$.subscribe(
      resData => {
        console.log(resData);
        setTimeout(()=>{
          this.isLoading = false;
        },1000)
      },
      errMessage => {
        console.log(errMessage);
        this.error = errMessage;
        this.isLoading = false;
      }
    )
  }

  noAccount(){
    
  }
}
