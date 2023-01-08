import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoutePath } from 'src/app/shared/enums/route-path';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  constructor( private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute ) {}

  isLoading = false;
  error: string = "";
  isTeacher : Boolean = false;
  serverErrorMessages = '';

  onSubmit(form: NgForm){
    form.value.isTeacher = this.isTeacher
    console.log(form.value)
    this.authService.signUP(form.value).subscribe(
      (res: any) => {
        console.log(res)
        this.router.navigate([`../${RoutePath.Login}`],
        { relativeTo: this.activatedRoute });
      },
      err => {
        if(err.status == 422){
          this.serverErrorMessages = err.error.join('<br>');
        }
        else{
          this.serverErrorMessages = "Something went wrong";
        }
      }
    )
  }

  changeType(type: Boolean){
    this.isTeacher = type;
  }
}
