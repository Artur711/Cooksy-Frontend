import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import swal from "sweetalert";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

 loginForm = this.formBuilder.group({
   username: [''],
   password: ['']
 });

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private location: Location) {
  }

  get form() {return this.loginForm.controls;}

  login() {
    this.authService.login(
      {
        username: this.form.username.value,
        password: this.form.password.value
      })
      .subscribe(success => {
        if (success) {
          swal("Yupii!", "Login are successful!", "success");
          this.router.navigate(['/menu/home']);
        }
      })
  }

  goBack(): void {
    this.location.back();
  }
}
