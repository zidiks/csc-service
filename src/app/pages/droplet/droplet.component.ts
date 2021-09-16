import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-droplet',
  templateUrl: './droplet.component.html',
  styleUrls: ['./droplet.component.scss']
})
export class DropletComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }

}
