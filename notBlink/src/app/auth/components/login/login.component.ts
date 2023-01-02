import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  ngOnInit(): void {
    
  }
  isLoading = false;
  error: string = "";



  onSubmit(form: NgForm){
    console.log(form.value)
  }

  noAccount(){
    
  }
}
