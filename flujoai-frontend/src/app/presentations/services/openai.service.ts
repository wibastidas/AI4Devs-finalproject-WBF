import { Injectable } from '@angular/core';
import {
  createThreadUseCase,
  postQuestionUseCase,
} from '@use-cases/index';
import { Observable, from, of, tap } from 'rxjs';
import { AuthService } from './AuthService.service';

@Injectable({ providedIn: 'root' })
export class OpenAiService {
  constructor(private authService: AuthService) {}

  createThread(): Observable<string> {
    const getToken = () => this.authService.getToken();
    return from(createThreadUseCase(getToken)).pipe(
      tap((thread) => {
        localStorage.setItem('thread', thread);
      })
    );
  }

  postQuestion(threadId: string, question: string) {
    const getToken = () => this.authService.getToken();
    return from(postQuestionUseCase(threadId, question, getToken));
  }
}
