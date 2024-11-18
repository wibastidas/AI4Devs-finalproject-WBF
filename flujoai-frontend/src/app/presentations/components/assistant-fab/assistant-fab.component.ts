import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { Component } from '@angular/core';

@Component({
  selector: 'app-assistant-fab',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <button 
      routerLink="/assistant"
      class="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center gap-2 group">
      <i class="fas fa-robot text-xl"></i>
      <span class="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap">
      Chatea con tu asistente financiero
      </span>
    </button>
  `
})
export class AssistantFabComponent {}
