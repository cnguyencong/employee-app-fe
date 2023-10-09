type InputType = 'text' | 'email' | 'password' | 'number' | 'textarea' | 'checkbox' | 'radio';

export interface CustomInputProp {
  id? : string,
  label?: string,
  type : InputType,
  name : string,
  value: unknown,
  placeholder?: string,
  size? : string,
  multiple : boolean,
  disabled? : boolean
}
