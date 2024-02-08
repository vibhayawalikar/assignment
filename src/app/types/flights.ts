export interface Flights{
    airline: string;
    depatureTime: number;
    returnTime: number;
    fare: Fare;
}

export interface Fare{
    basic: number;
    main: number;
    business: number;
}