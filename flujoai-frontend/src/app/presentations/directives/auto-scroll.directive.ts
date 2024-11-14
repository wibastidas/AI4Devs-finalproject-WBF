// src/app/presentations/directives/auto-scroll.directive.ts
import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appAutoScroll]',
  standalone: true
})
export class AutoScrollDirective implements AfterViewInit, OnDestroy {
  private mutationObserver!: MutationObserver;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.mutationObserver = new MutationObserver(() => {
      this.scrollToBottom();
    });

    this.mutationObserver.observe(this.el.nativeElement, {
      childList: true,
      subtree: true
    });

    // Scroll inicial
    this.scrollToBottom();
  }

  ngOnDestroy() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
      }, 0);
    } catch(err) {
      console.error('Error en scroll:', err);
    }
  }
}