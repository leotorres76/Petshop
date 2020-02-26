import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Security } from 'src/app/utils/security.util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  public user: User;
  
  constructor(private router: Router) { }

  ngOnInit() {
    this.user = Security.getUser(); // busca o usuário
  }

  logout(){
    Security.clear(); //limpa dados do local storage
    this.router.navigate(['/login']); //volta o usuário para página de se login
  }

}
