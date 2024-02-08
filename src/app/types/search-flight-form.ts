import { FormControl } from "@angular/forms"

export interface SearchFlightForm {
    departure: FormControl<string | null>;
    destination: FormControl<string | null>;
    departDate: FormControl<string | null>;
    returnDate: FormControl<string | null>;
    travelers: FormControl<Object>;
    class: FormControl<string | null>;
    travelerStr: FormControl<string | null>;
}