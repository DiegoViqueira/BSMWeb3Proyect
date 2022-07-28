import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.page.html',
  styleUrls: ['./log-out.page.scss'],
})
export class LogOutPage implements OnInit {

  constructor(private authService : AuthServiceService, private router: Router) { }

  ngOnInit() {

    this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

}
