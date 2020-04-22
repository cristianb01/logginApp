import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel = new UserModel;
  rememberUser = false;

  constructor( private authService: AuthService,
               private router: Router) { }

  ngOnInit() {
    if( localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
      this.rememberUser = true;
    }
  }


  login(form: NgForm) {

    if(!form.valid) return;

    Swal.fire({
      icon: 'info',
      text: 'Espera un momento...',
      allowOutsideClick:false
    });
    Swal.showLoading();


    this.authService.login(this.user)
      .subscribe( resp => {

        console.log(resp);
        Swal.close();

        if(this.rememberUser) {
          localStorage.setItem('email',this.user.email);
        }

        this.router.navigateByUrl('/home');


      }, (err) => {

        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message,
        });
        console.log(err.error.error.message);

    });
  }
}
