import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TypingLoaderComponent, MyMessageComponent, ChatMessageComponent, TextMessageBoxComponent } from '@components/index';
import { Message } from '@app/interfaces/message.interface';
import { OpenAiService } from '@app/presentations/services/openai.service';
import { AutoScrollDirective } from '@app/presentations/directives/auto-scroll.directive';
import { ChatStateService } from '@app/presentations/services/chat-state.service';

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
    private chatStateService = inject(ChatStateService);
    public messages = this.chatStateService.getMessages();
    public isLoading = signal(false);
    public openAiService = inject(OpenAiService);
    public threadId = this.chatStateService.getThreadId();

    ngOnInit(): void {
        const existingThreadId = this.chatStateService.loadPersistedThread();
        
        if (!existingThreadId) {
            this.openAiService.createThread()
                .subscribe(id => {
                    this.chatStateService.setThreadId(id);
                });
        }
    }

    handleMessage(question: string) {
        this.isLoading.set(true);
        
        this.chatStateService.addMessage({ 
            text: question.trim(), 
            isGpt: false 
        });

        this.openAiService.postQuestion(this.threadId()!, question)
            .subscribe({
                next: (reply) => {
                    this.isLoading.set(false);
                    
                    if (reply && reply.content) {
                        const messages = reply.content.map(message => ({
                            text: message.text,
                            isGpt: reply.role === 'assistant'
                        }));
                        this.chatStateService.addMessages(messages);
                    }
                },
                error: (error) => {
                    console.error('Error:', error);
                    this.isLoading.set(false);
                    this.chatStateService.addMessage({
                        text: "Lo siento, hubo un error al procesar tu pregunta. Por favor, intenta de nuevo.",
                        isGpt: true
                    });
                }
            });
    }
}
