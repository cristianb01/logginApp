import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user: UserModel;



  constructor( private authService: AuthService,
               private router: Router) { }

  ngOnInit() { 
    this.user = new UserModel();
  }


  onSubmit( form: NgForm ) {

    if(form.invalid) return;

    Swal.fire({
      icon: 'info',
      text: 'Espera un momento...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.authService.register(this.user)
        .subscribe( resp => {

          console.log(resp);
          Swal.close();

          Swal.fire({
            icon: 'success',
            text: `Se creo un nuevo usuario:\n
                    - ${this.user.name}\n
                    - ${this.user.email}`
          });

          this.router.navigateByUrl('/home');

        }, (err) => {


          Swal.fire({
            icon: 'error',
            text: err.error.error.message
          })
          console.log(err.error.error.message);
          
        })
  }

}
