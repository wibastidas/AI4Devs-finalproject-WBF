import { Injectable, signal } from '@angular/core';
import { Message } from '@app/interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatStateService {
  private messages = signal<Message[]>([]);
  private threadId = signal<string|undefined>(undefined);

  getMessages() {
    return this.messages;
  }

  getThreadId() {
    return this.threadId;
  }

  setThreadId(id: string) {
    this.threadId.set(id);
    localStorage.setItem('threadId', id);
  }

  addMessage(message: Message) {
    this.messages.update(prev => [...prev, message]);
  }

  addMessages(messages: Message[]) {
    this.messages.update(prev => [...prev, ...messages]);
  }

  clearMessages() {
    this.messages.set([]);
    localStorage.removeItem('threadId');
  }

  loadPersistedThread() {
    const threadId = localStorage.getItem('threadId');
    if (threadId) {
      this.threadId.set(threadId);
      return threadId;
    }
    return undefined;
  }
}