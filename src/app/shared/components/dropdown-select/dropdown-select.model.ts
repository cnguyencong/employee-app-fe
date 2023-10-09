
export interface DropdownSelectProp {
  id? : string,
  label?: string,
  items : Array<any>,
  value: unknown,
  placeholder?: string,
  bindLabel:string,
  bindValue:string,
  multiple : boolean,
  disabled? : boolean
}
