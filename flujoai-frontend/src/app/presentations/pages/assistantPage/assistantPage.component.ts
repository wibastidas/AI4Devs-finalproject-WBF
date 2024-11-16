import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TypingLoaderComponent, MyMessageComponent, ChatMessageComponent, TextMessageBoxComponent } from '@components/index';

import { Message } from '@app/interfaces/message.interface';
import { OpenAiService } from '@app/presentations/services/openai.service';
import { AutoScrollDirective } from '@app/presentations/directives/auto-scroll.directive';

@Component({
    selector: 'app-assistant-page',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ChatMessageComponent,
        MyMessageComponent,
        TypingLoaderComponent,
        TextMessageBoxComponent,
        AutoScrollDirective,
    ],
    templateUrl: './assistantPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AssistantPageComponent {
    public messages = signal<Message[]>([]);
    public isLoading = signal(false);
    public openAiService = inject(OpenAiService);
  
    public threadId = signal<string|undefined>(undefined);
  
    ngOnInit(): void {
      this.openAiService.createThread()
        .subscribe( id => {
            this.threadId.set( id );
        });
  
    }
  
  
    handleMessage(question: string) {
      this.isLoading.set(true);
      
      this.messages.update(prev => [...prev, { 
        text: question.trim(), 
        isGpt: false 
      }]);
  
      this.openAiService.postQuestion(this.threadId()!, question)
        .subscribe({
          next: (reply) => {
            this.isLoading.set(false);
            
            if (reply && reply.content) {
              for (const message of reply.content) {
                this.messages.update(prev => [
                  ...prev,
                  {
                    text: message.text,
                    isGpt: reply.role === 'assistant'
                  }
                ]);
              }
            }
          },
          error: (error) => {
            console.error('Error:', error);
            this.isLoading.set(false);
            this.messages.update(prev => [
              ...prev,
              {
                text: "Lo siento, hubo un error al procesar tu pregunta. Por favor, intenta de nuevo.",
                isGpt: true
              }
            ]);
          }
        });
    }
}
