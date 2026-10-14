import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsItem } from '../../models/news.model';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <article class="card">
      <div class="card-media"><img [src]="news.imagen" [alt]="'Imagen relacionada con ' + news.titulo"></div>
      <div class="card-body">
        <span class="category">{{ news.categoria }}</span>
        <h3>{{ news.titulo }}</h3>
        <p>{{ news.descripcion }}</p>
        <a class="btn" [routerLink]="['/detalle', news.id]">Ver más</a>
      </div>
    </article>`
})
export class NewsCardComponent {
  @Input({ required: true }) news!: NewsItem;
}
