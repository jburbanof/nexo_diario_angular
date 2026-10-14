import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NewsItem } from '../../models/news.model';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-detalle', standalone: true, imports: [RouterLink],
  template: `
    <section class="container page-space">
      @if (news) {
        <div class="detail-meta">{{ news.categoria }} · {{ news.fecha }}</div>
        <h1 class="detail-title">{{ news.titulo }}</h1>
        <p class="detail-summary">{{ news.descripcion }}</p>
        <div class="detail-layout">
          <img class="detail-image" [src]="news.imagen" [alt]="'Imagen principal de ' + news.titulo">
          <aside class="action-panel">
            <h3>Acciones</h3>
            <button class="btn" (click)="toggleFavorite()">{{ favorite ? 'Quitar de favoritos' : 'Agregar a favoritos' }}</button>
            <a class="btn secondary" routerLink="/contacto">Contactar</a>
          </aside>
        </div>
        <article class="article"><h2>Resumen de la noticia</h2><p>{{ news.contenido }}</p></article>
        <p class="back-link"><a class="btn secondary" routerLink="/noticias">← Volver al listado</a></p>
      } @else { <div class="empty"><h3>Noticia no encontrada</h3><a class="btn" routerLink="/noticias">Volver a noticias</a></div> }
    </section>`
})
export class DetalleComponent implements OnInit {
  news?: NewsItem; favorite = false;
  constructor(private route: ActivatedRoute, private newsService: NewsService) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.newsService.getById(id).subscribe(item => { this.news = item; this.favorite = item ? this.newsService.isFavorite(item.id) : false; });
  }
  toggleFavorite(): void { if (this.news) this.favorite = this.newsService.toggleFavorite(this.news.id); }
}
