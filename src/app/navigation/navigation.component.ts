import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { NavLinks } from './navigation.constants';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  mobileQuery: MediaQueryList;
  navLinks = NavLinks;

  constructor(private cdr: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 599px)');
    this.mobileQuery.addEventListener("change", () => {
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {

  }
  ngOnDestroy() { }
}