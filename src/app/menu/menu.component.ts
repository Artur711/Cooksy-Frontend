import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  public title = "Home";

  constructor(private authService: AuthService, private router: Router) { }

  onNavigationChange(newTitle: string): void {
    this.title = newTitle;
  }

  logout(){
    this.authService.doLogoutUser();
    this.router.navigate(['']);
  }

}
