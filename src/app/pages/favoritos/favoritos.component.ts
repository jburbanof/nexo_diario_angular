import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsItem } from '../../models/news.model';
import { NewsService } from '../../services/news.service';
import { NewsCardComponent } from '../../components/news-card/news-card.component';

@Component({
  selector: 'app-favoritos', standalone: true, imports: [RouterLink, NewsCardComponent],
  template: `
    <section class="container page-space">
      <div class="page-title"><p class="eyebrow">COLECCIÓN</p><h1>Mis favoritos</h1><p>Noticias guardadas para consultar más tarde.</p></div>
      @if (favorites.length) {
        <div class="grid cards-grid">@for (item of favorites; track item.id) { <app-news-card [news]="item"></app-news-card> }</div>
      } @else {
        <div class="empty"><h3>Sin favoritos todavía</h3><p>Guarda una noticia desde su vista de detalle.</p><a class="btn" routerLink="/noticias">Explorar noticias</a></div>
      }
    </section>`
})
export class FavoritosComponent implements OnInit {
  favorites: NewsItem[] = [];
  constructor(private newsService: NewsService) {}
  ngOnInit(): void {
    const ids = this.newsService.getFavoriteIds();
    this.newsService.getAll().subscribe(items => this.favorites = items.filter(item => ids.includes(item.id)));
  }
}
