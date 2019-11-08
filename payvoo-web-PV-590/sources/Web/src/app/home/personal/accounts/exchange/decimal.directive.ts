import { Directive, HostListener, ElementRef } from '@angular/core';
@Directive({
  selector: '[appDecimal]'
})
export class DecimalDirective {

  constructor(private eleRef:ElementRef) { }

  @HostListener('keypress',['$event']) onKeyPress(event)
  {
    if ((event.which != 46 || this.eleRef.nativeElement.value.split(".").length === 2) && (event.which < 48 || event.which > 57)) {
      event.preventDefault();
   }
  }

}
