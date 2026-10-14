import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { NewsItem } from '../../models/news.model';
import { NewsCardComponent } from '../../components/news-card/news-card.component';

@Component({
  selector: 'app-home', standalone: true, imports: [RouterLink, NewsCardComponent],
  template: `
    <section class="container page-space">
      <div class="hero">
        <p class="eyebrow">PERIÓDICO DIGITAL</p>
        <h1>Historias que conectan contigo</h1>
        <p>Explora noticias de tecnología, educación, turismo y negocios en una experiencia simple, moderna y personalizada.</p>
        <a class="btn" routerLink="/noticias">Explorar noticias</a>
      </div>
      <div class="section-heading"><h2>Noticias destacadas</h2><a routerLink="/noticias">Ver todas</a></div>
      <div class="grid cards-grid">
        @for (item of featured; track item.id) { <app-news-card [news]="item"></app-news-card> }
      </div>
      <section class="info-band">
        <div><strong>Contenido organizado</strong><span>Consulta noticias por categoría y encuentra información con rapidez.</span></div>
        <div><strong>Favoritos persistentes</strong><span>Guarda publicaciones para revisarlas después desde el mismo navegador.</span></div>
        <div><strong>Participación</strong><span>Contacta al sitio y administra noticias desde una interfaz sencilla.</span></div>
      </section>
    </section>`
})
export class HomeComponent implements OnInit {
  featured: NewsItem[] = [];
  constructor(private newsService: NewsService) {}
  ngOnInit(): void { this.newsService.getAll().subscribe(items => this.featured = items.slice(0, 3)); }
}
