import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { NewsItem } from '../models/news.model';

const STORAGE = {
  favorites: 'nexo_favoritos',
  created: 'nexo_noticias_creadas',
  deleted: 'nexo_noticias_eliminadas'
};

@Injectable({ providedIn: 'root' })
export class NewsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>('assets/data/noticias.json').pipe(
      map(base => {
        const created = this.read<NewsItem[]>(STORAGE.created, []);
        const deleted = this.read<number[]>(STORAGE.deleted, []);
        return [...base, ...created].filter(item => !deleted.includes(item.id));
      })
    );
  }

  getById(id: number): Observable<NewsItem | undefined> {
    return this.getAll().pipe(map(items => items.find(item => item.id === id)));
  }

  getFavoriteIds(): number[] {
    return this.read<number[]>(STORAGE.favorites, []);
  }

  isFavorite(id: number): boolean {
    return this.getFavoriteIds().includes(id);
  }

  toggleFavorite(id: number): boolean {
    const favorites = this.getFavoriteIds();
    const updated = favorites.includes(id)
      ? favorites.filter(itemId => itemId !== id)
      : [...favorites, id];
    this.write(STORAGE.favorites, updated);
    return updated.includes(id);
  }

  create(data: Omit<NewsItem, 'id' | 'fecha' | 'contenido'>): NewsItem {
    const created = this.read<NewsItem[]>(STORAGE.created, []);
    const item: NewsItem = {
      ...data,
      id: Date.now(),
      fecha: new Intl.DateTimeFormat('es-CO', { dateStyle: 'long' }).format(new Date()),
      contenido: `${data.descripcion} Esta noticia fue creada desde el módulo de administración de Nexo Diario.`
    };
    this.write(STORAGE.created, [...created, item]);
    return item;
  }

  delete(id: number): void {
    const created = this.read<NewsItem[]>(STORAGE.created, []);
    if (created.some(item => item.id === id)) {
      this.write(STORAGE.created, created.filter(item => item.id !== id));
    } else {
      const deleted = this.read<number[]>(STORAGE.deleted, []);
      if (!deleted.includes(id)) this.write(STORAGE.deleted, [...deleted, id]);
    }
    this.write(STORAGE.favorites, this.getFavoriteIds().filter(itemId => itemId !== id));
  }

  private read<T>(key: string, fallback: T): T {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) as T : fallback;
    } catch {
      return fallback;
    }
  }

  private write<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
