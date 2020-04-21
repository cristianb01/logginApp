import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user: UserModel;



  constructor( private authService: AuthService) { }

  ngOnInit() { 
    this.user = new UserModel();
  }


  onSubmit( form: NgForm ) {

    if(form.invalid) return;

    this.authService.register(this.user)
        .subscribe( resp => {
          console.log(resp);
        })
  }

}
