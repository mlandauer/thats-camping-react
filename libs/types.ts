export interface Campsite {
  id: string;
  name: string;
  starred: boolean;
  description: string;
  park: Park;
  access: Access;
  facilities: Facilities;
  position: Position;
}

export interface Position {
  lat: number;
  lng: number;
}

export interface Park {
  id: number;
  name: string;
}

export interface Access {
  caravans: boolean;
  trailers: boolean;
  car: boolean;
}

export interface Facilities {
  toilets: string;
  picnicTables: boolean;
  barbecues: string;
  showers: string;
  drinkingWater: boolean;
}
