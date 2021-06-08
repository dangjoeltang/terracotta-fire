import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { NavLinks } from './navigation.constants';
import { UserService } from '../core/services/user/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  mobileQuery: MediaQueryList;
  navLinks = NavLinks;

  constructor(private cdr: ChangeDetectorRef, media: MediaMatcher, private userService: UserService) {
    this.mobileQuery = media.matchMedia('(max-width: 599px)');
    this.mobileQuery.addEventListener("change", () => {
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {

  }

  logoutClicked() {
    // TODO change window.confirm to an angular dialog
    if (window.confirm('Logout?')) {
      this.userService.signout();
    }
  }
}