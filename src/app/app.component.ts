import { Component } from '@angular/core';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trec-apps-falsehood-client-b';

  tokenService: TokenService;

  constructor(tokenService: TokenService) {
    this.tokenService = tokenService;
   }

  logout() {
    this.tokenService.logout();
  }
}
