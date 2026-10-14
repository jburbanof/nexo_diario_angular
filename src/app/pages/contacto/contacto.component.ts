import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto', standalone: true, imports: [ReactiveFormsModule],
  template: `
    <section class="container page-space">
      <div class="page-title"><p class="eyebrow">CONTACTO</p><h1>Contáctanos</h1><p>¿Tienes una pregunta, sugerencia o noticia para compartir?</p></div>
      <div class="contact-layout">
        <form class="panel form-panel" [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <label>Nombre completo<input class="input" formControlName="nombre"></label>
          @if (invalid('nombre')) { <small class="field-error">El nombre es obligatorio.</small> }
          <label>Correo electrónico<input class="input" type="email" formControlName="email"></label>
          @if (invalid('email')) { <small class="field-error">Escribe un correo electrónico válido.</small> }
          <label>Asunto<input class="input" formControlName="asunto"></label>
          @if (invalid('asunto')) { <small class="field-error">El asunto es obligatorio.</small> }
          <label>Mensaje<textarea class="input" rows="6" formControlName="mensaje"></textarea></label>
          @if (invalid('mensaje')) { <small class="field-error">El mensaje es obligatorio.</small> }
          <button class="btn" type="submit">Enviar</button>
          @if (sent) { <div class="message success show" role="status">Mensaje enviado correctamente. Gracias por contactar a Nexo Diario.</div> }
        </form>
        <aside class="contact-aside">
          <div class="info-card"><h3>Información</h3><p>Correo: contacto&#64;nexodiario.co</p><p>Horario: Lun-Vie 8:00 a 17:00</p><p>Respuesta estimada: 24-48 h</p></div>
          <div class="panel"><h3>Validaciones implementadas</h3><ul><li>Campos obligatorios</li><li>Formato de correo</li><li>Mensaje de confirmación</li></ul></div>
        </aside>
      </div>
    </section>`
})
export class ContactoComponent {
  sent = false;
  form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    asunto: ['', Validators.required],
    mensaje: ['', Validators.required]
  });
  constructor(private fb: FormBuilder) {}
  invalid(name: 'nombre'|'email'|'asunto'|'mensaje'): boolean {
    const control = this.form.controls[name]; return control.invalid && (control.touched || control.dirty);
  }
  submit(): void {
    this.sent = false;
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.sent = true; this.form.reset();
  }
}
