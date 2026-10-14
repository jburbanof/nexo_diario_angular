import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewsItem } from '../../models/news.model';
import { NewsService } from '../../services/news.service';
import { NewsCardComponent } from '../../components/news-card/news-card.component';

@Component({
  selector: 'app-noticias', standalone: true, imports: [FormsModule, NewsCardComponent],
  template: `
    <section class="container page-space">
      <div class="page-title"><p class="eyebrow">CATÁLOGO</p><h1>Explorar noticias</h1><p>Filtra por categoría o busca por una palabra clave.</p></div>
      <div class="toolbar">
        <label class="search-label">Buscar noticias
          <input class="input" [(ngModel)]="query" (ngModelChange)="applyFilters()" placeholder="Ej. tecnología, educación...">
        </label>
        <div class="filter-row" aria-label="Filtro por categoría">
          @for (category of categories; track category) {
            <button class="chip" [class.active]="selectedCategory === category" (click)="selectCategory(category)">{{ category }}</button>
          }
        </div>
      </div>
      @if (filtered.length) {
        <div class="grid cards-grid">@for (item of filtered; track item.id) { <app-news-card [news]="item"></app-news-card> }</div>
      } @else { <div class="empty"><h3>No encontramos resultados</h3><p>Prueba otro término o cambia la categoría seleccionada.</p></div> }
    </section>`
})
export class NoticiasComponent implements OnInit {
  all: NewsItem[] = []; filtered: NewsItem[] = []; query = ''; selectedCategory = 'Todas';
  categories = ['Todas', 'Tecnología', 'Educación', 'Turismo', 'Negocios'];
  constructor(private newsService: NewsService) {}
  ngOnInit(): void { this.newsService.getAll().subscribe(items => { this.all = items; this.applyFilters(); }); }
  selectCategory(category: string): void { this.selectedCategory = category; this.applyFilters(); }
  applyFilters(): void {
    const term = this.query.trim().toLowerCase();
    this.filtered = this.all.filter(item => {
      const categoryOk = this.selectedCategory === 'Todas' || item.categoria === this.selectedCategory;
      const text = `${item.titulo} ${item.descripcion} ${item.categoria}`.toLowerCase();
      return categoryOk && text.includes(term);
    });
  }
}
