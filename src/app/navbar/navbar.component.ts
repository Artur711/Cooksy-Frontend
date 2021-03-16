import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public isCollapsed = true;

  @Output()
  onNavigationChange = new EventEmitter<string>();

  onNavItemClick(title: string) {
    this.onNavigationChange.emit(title);
  }
}
