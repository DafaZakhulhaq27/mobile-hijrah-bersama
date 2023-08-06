export type Schedule = {
    date: string;
    code_flight_schedule: string;
    boarding_passcode: string;
    departure_time: string;
    arrived_time: string;
};

export type Product = {
    _id: string;
    program: string;
    price: number;
    seat: number;
    is_sold: boolean;
    is_added_cart: boolean;
    schedule: Schedule[];
  }