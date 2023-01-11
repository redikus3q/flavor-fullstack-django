import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style = `
    transform: scale(0.95);
    box-shadow: 0px 0px 29px 15px rgba(0, 0, 0, 0.85);`;
    this.el.nativeElement.style.cursor = "pointer";
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style = `
    transform: scale(1);
    box-shadow: colors.$shadow-card;`;
  }

}
