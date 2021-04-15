import { Component, OnInit } from '@angular/core';
import {UserDto} from "../models/dto";
import {SettingsService} from "../services/settings.service";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  user!: UserDto;
  constructor(private settingService: SettingsService) { }

  ngOnInit(): void {
    this.settingService.getUser$()
      .subscribe(user => {
      this.user = user;
  })

}
}
