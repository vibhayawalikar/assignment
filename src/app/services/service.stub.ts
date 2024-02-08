import { Flights } from "../types/flights";

export class ProcessFlightDataServiceStub {
    getSortTechnique() { return ''}
    setSortTechnique() {}
    sortPriceAsc(flight: Flights[]) {}
    sortPriceDsc(flight: Flights[]) {}
    sortShortestDuration(flight: Flights[]) {}
    sortLongestDuration(flight: Flights[]) {}
    sortDepartureAsc(flight: Flights[]) {}
    sortArrivalAsc(flight: Flights[]) {}
    sortAirlinesAsc(flight: Flights[]) {}
    sortAirlinesDsc(flight: Flights[]) {}
}

export class DataServiceStub{
    fetchFlightData() { return {subscribe: () => {}}}
}