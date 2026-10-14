import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="site-footer">
      <div class="container footer-wrap">
        <span>Nexo Diario · Información clara, actual y cercana</span>
        <span>© 2026</span>
      </div>
    </footer>`
})
export class FooterComponent {}
