import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <div class="container nav-wrap">
        <a class="brand" routerLink="/">NEXO DIARIO</a>
        <nav aria-label="Navegación principal">
          <a routerLink="/" [routerLinkActiveOptions]="{exact:true}" routerLinkActive="active">Inicio</a>
          <a routerLink="/noticias" routerLinkActive="active">Noticias</a>
          <a routerLink="/favoritos" routerLinkActive="active">Favoritos</a>
          <a routerLink="/contacto" routerLinkActive="active">Contacto</a>
          <a routerLink="/administrar" routerLinkActive="active">Administrar</a>
        </nav>
      </div>
    </header>`
})
export class HeaderComponent {}
