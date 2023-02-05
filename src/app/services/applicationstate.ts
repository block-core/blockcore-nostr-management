import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, map, shareReplay, Observable } from 'rxjs';
import { AuthenticationService } from './authentication';
import { Action } from './interfaces';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ApplicationState {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthenticationService,
    private location: Location
  ) {
    this.isSmallScreen$ = this.breakpointObserver
      .observe('(max-width: 599px)')
      .pipe(
        map((result) => result.matches),
        shareReplay()
      );

    this.displayLabels$ = this.breakpointObserver
      .observe('(max-width: 720px)')
      .pipe(
        map((result) => result.matches),
        shareReplay()
      );

    this.connected$ = this.connectedChanged.asObservable();

    this.visibility$ = this.visibilityChanged.asObservable();

    this.title$ = this.titleChanged.asObservable();

    this.initialized$ = this.initializedChanged.asObservable();
  }

  getPublicKey(): string {
    return this.authService.authInfo$.getValue().publicKeyHex!;
  }

  navigateBack() {
    this.location.back();
  }

  title = 'Blockcore Notes';

  title$: Observable<string>;

  titleChanged: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.title
  );

  updateTitle(title: string) {
    this.title = title;
    this.titleChanged.next(this.title);
  }

  goBack = false;

  showBackButton = false;

  backUrl?: string;

  searchText?: string;

  showSearch = false;

  actions: Action[] = [];

  /** Parameters that comes from query string during activation of the extension. */
  params: any;

  isSmallScreen$: Observable<boolean>;

  displayLabels$: Observable<boolean>;

  connected$: Observable<boolean>;

  initialized$: Observable<boolean>;

  connected = false;

  connectedChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.connected
  );

  initializedChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  /** This will check if status has changed and trigger. If status is the same, the observable is not triggered. */
  updateConnectionStatus(status: boolean) {
    if (this.connected != status) {
      this.connected = status;
      this.connectedChanged.next(status);
    }
  }

  visibility$: Observable<boolean>;

  visibilityChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  visibility(status: boolean) {
    this.visibilityChanged.next(status);
  }

  initialized = false;

  setInitialized() {
    this.initialized = true;
    this.initializedChanged.next(this.initialized);
  }
}
