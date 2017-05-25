// This is the form of the campsite data as it is in data_simplified.json
export interface CampsiteOriginal {
  id: number;
  name: string;
  description: string;
  position: Position;
  facilities: Facilities;
  access: Access;
  park_id: number;
}

export interface Campsite {
  id: number;
  name: string;
  description: string;
  position: Position;
  access: Access;
  facilities: Facilities;
  starred: boolean;
  park: Park;
}

export interface Position {
  lat: number;
  lng: number;
}

export interface Park {
  id: number;
  name: string;
  description: string;
  campsite_ids: number[];
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
