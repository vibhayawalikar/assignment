import { AbstractControl } from "@angular/forms";

export function dateValidator() {
  return (control: AbstractControl) : { [key: string]: any } | null => {
    const fromDate = control.value.departDate;
    const toDate = control.value.returnDate;

    if (fromDate && toDate && fromDate > toDate) {
      return { 'dateError': true };
    }
    return null;
  } 
}

export function locationValidator(){
  return (control: AbstractControl) : { [key: string]: any } | null => {
    const departure = control.value.departure;
    const destination = control.value.destination;

    if (destination && destination && departure === destination) {
      return { 'sameLocationErr': true };
    }
    return null;
  } 
}