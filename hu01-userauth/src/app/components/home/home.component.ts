import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private userService: UserService, private router: Router) {}

  logOut(): void {
    this.userService.logOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(err => {
        console.log(err);
      });
  }

}
