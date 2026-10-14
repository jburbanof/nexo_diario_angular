import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AdministrarComponent } from './pages/administrar/administrar.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Nexo Diario | Inicio' },
  { path: 'noticias', component: NoticiasComponent, title: 'Nexo Diario | Noticias' },
  { path: 'detalle/:id', component: DetalleComponent, title: 'Nexo Diario | Detalle' },
  { path: 'favoritos', component: FavoritosComponent, title: 'Nexo Diario | Favoritos' },
  { path: 'contacto', component: ContactoComponent, title: 'Nexo Diario | Contacto' },
  { path: 'administrar', component: AdministrarComponent, title: 'Nexo Diario | Administrar' },
  { path: '**', redirectTo: '' }
];
