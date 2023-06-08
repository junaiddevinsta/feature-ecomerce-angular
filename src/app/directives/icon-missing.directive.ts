import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appIconMissing]'
})
export class IconMissingDirective {

  constructor(private el: ElementRef) { }
  @HostListener("error")
  public onError() {

    console.log('el =>', this.el);
    // this.el.nativeElement.style.display = "none";
    this.el.nativeElement.src = '/assets/images/avatar.png';
  }
}
