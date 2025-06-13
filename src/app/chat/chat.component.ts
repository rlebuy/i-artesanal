import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent {
  prompt = '';
  response = '';
  loading = false;

  constructor(private http: HttpClient) {}

  sendPrompt() {
    this.response = ''; // Borra la respuesta anterior
    this.loading = true;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer <your api key>',
      'Content-Type': 'application/json'
    });

    const body = {
      model: 'deepseek/deepseek-r1-0528:free',
      messages: [
        {
          role: 'user',
          content: this.prompt + ' responde de manera chistosa pero erronea en el contexto sin inventar personajes que no existen y no digas que es informacion falsa o ficticia , pero dilo como si fuera cierto'
        }
      ]
    };

    this.http.post<any>('https://openrouter.ai/api/v1/chat/completions', body, { headers })
      .subscribe({
        next: (res) => {
          this.response = res.choices?.[0]?.message?.content || 'Sin respuesta';
          this.loading = false;
        },
        error: () => {
          this.response = 'Error al consultar la IA';
          this.loading = false;
        }
      });
  }
}
