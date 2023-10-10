/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/directive-selector */
import {
    Directive,
    ElementRef,
    Input,
    OnInit,
  } from '@angular/core';
import Inputmask from "inputmask";
  
  @Directive({
    selector: '[mask]'
  })
  export class InputMaskDirective implements OnInit {
    @Input() mask: any;
   
    constructor(
        private elm: ElementRef,
    ) {}
    ngOnInit() {
      const im = new Inputmask(this.mask);
      im.mask(this.elm.nativeElement);
    }
  }
  