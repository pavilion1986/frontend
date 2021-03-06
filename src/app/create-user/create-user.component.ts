import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { UserModel } from '../model/user.model';
import { CreateUserService } from './create-user.service';
import { OK } from '../model/httpStatus.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  public user: UserModel;
  public isValid = true;
  public message = '';

  constructor(private createUserServie: CreateUserService, private router: Router) {
    if (sessionStorage.getItem('user')) {
      this.user =  JSON.parse(sessionStorage.getItem('user'));
    } else {
      this.user = new UserModel();
    }

   }

  ngOnInit() {
  }


  saveOrUpdate () {
    this.isValid = this.createUserServie.validate(this.user);
    if (this.isValid) {
      this.createUserServie.saveOrUpdate(this.user).subscribe(res => {
        if (res.responseCode === OK) {
            this.router.navigate(['/users']);
        } else {
          this.message = res.message;
          this.isValid = false;
        }
      });

    } else {
      this.message = 'Veuillez remplir les champs obligatoires !';
    }
    sessionStorage.clear();  
  }

}
