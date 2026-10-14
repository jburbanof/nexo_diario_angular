import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewsItem } from '../../models/news.model';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-administrar', standalone: true, imports: [ReactiveFormsModule],
  template: `
    <section class="container page-space">
      <div class="page-title"><p class="eyebrow">MINI CRUD</p><h1>Administrar noticias</h1><p>Crear y eliminar noticias desde una interfaz sencilla.</p></div>
      <div class="admin-layout">
        <form class="panel form-panel" [formGroup]="form" (ngSubmit)="create()">
          <h2>Nueva noticia</h2>
          <label>Título<input class="input" formControlName="titulo"></label>
          <label>Categoría<select class="input" formControlName="categoria"><option value="">Seleccionar</option><option>Tecnología</option><option>Educación</option><option>Turismo</option><option>Negocios</option></select></label>
          <label>Descripción breve<textarea class="input" rows="4" formControlName="descripcion"></textarea></label>
          <label>Ruta de imagen<input class="input" formControlName="imagen" placeholder="assets/images/tecnologia.svg"></label>
          <button class="btn" type="submit">Crear noticia</button>
          @if (createdMessage) { <div class="message success show" role="status">{{ createdMessage }}</div> }
        </form>
        <div class="panel"><h2>Noticias existentes</h2>
          <div class="admin-list">
            @for (item of items; track item.id) {
              <div class="admin-item"><div><strong>{{ item.titulo }}</strong><span>{{ item.categoria }}</span></div><button class="btn danger" (click)="remove(item.id)">Eliminar</button></div>
            }
          </div>
        </div>
      </div>
    </section>`
})
export class AdministrarComponent implements OnInit {
  items: NewsItem[] = []; createdMessage = '';
  form = this.fb.nonNullable.group({
    titulo: ['', Validators.required], categoria: ['', Validators.required], descripcion: ['', Validators.required],
    imagen: ['assets/images/tecnologia.svg', Validators.required]
  });
  constructor(private fb: FormBuilder, private newsService: NewsService) {}
  ngOnInit(): void { this.refresh(); }
  create(): void {
    this.createdMessage = '';
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.newsService.create(this.form.getRawValue());
    this.form.reset({ titulo: '', categoria: '', descripcion: '', imagen: 'assets/images/tecnologia.svg' });
    this.createdMessage = 'La noticia fue creada y guardada en el navegador.'; this.refresh();
  }
  remove(id: number): void { this.newsService.delete(id); this.refresh(); }
  private refresh(): void { this.newsService.getAll().subscribe(items => this.items = items); }
}
