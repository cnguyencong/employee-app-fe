import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { CustomInputProp } from './input.model'

@Component({
  selector: 'app-custom-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent
  implements OnInit, ControlValueAccessor, OnDestroy
{
  @Input() props: CustomInputProp;

  private _errors : any
  @Input() set errors(err : any) {
    this._errors = err
  }
  get errors() : any {
    return this._errors;
  }

  private _formControl : any
  @Input() set basedFormControl(value : any) {
    this._formControl = value
  }
  get basedFormControl() : any {
    return this._formControl;
  }

  @Output() inputChange = new EventEmitter<string>();

  public inputControl: FormControl;

  private subscriptions: Subscription[] = [];
  private disabled: boolean;

  constructor() {
    if (this.props?.disabled !== undefined) this.setDisabledState(this.props?.disabled);
    this.inputControl = new FormControl('');
    if(this.props?.value) {
      this.inputControl.setValue(this.props?.value)
      this.inputControl.updateValueAndValidity();
    }
  }

  ngOnInit() {
    this.subscriptions.push(
      this.inputControl.valueChanges
        .pipe(debounceTime(100), distinctUntilChanged())
        .subscribe((data) => {
          if (data !== undefined) {
            this.change(data);
          }
        })
    );

    if (this.props?.value !== undefined) this.inputControl.setValue(this.props?.value);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public propagateChange: any = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public propagateTouched: any = () => {};

  private change = (data: any) => {
    this.propagateChange(data);
    if(data !== '' && data !== undefined) {
      this.propagateTouched(data);
    }
    if (this.inputChange) this.inputChange.emit(data);
  };

  writeValue(obj: any): void {
    this.inputControl.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.inputControl.disable();
    } else {
      this.inputControl.enable();
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0)
      this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
