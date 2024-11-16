import { Injectable } from '@angular/core';
import {
  createThreadUseCase,
  postQuestionUseCase,
} from '@use-cases/index';
import { Observable, from, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenAiService {
  createThread(): Observable<string> {
    return from(createThreadUseCase()).pipe(
      tap((thread) => {
        localStorage.setItem('thread', thread);
      })
    );
  }

  postQuestion(threadId: string, question: string) {
    const cleanQuestion = question.trim();
    return from(postQuestionUseCase(threadId, cleanQuestion));
  }
}
