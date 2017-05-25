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

// This is the form of the park data as it is in data_simplified.json
export interface ParkOriginal {
  id: number;
  name: string;
  description: string;
  campsite_ids: number[];
}

export interface CampsiteWithStarred extends CampsiteOriginal {
  starred: boolean;
}

export interface Campsite extends CampsiteWithStarred {
  park: ParkOriginal;
}

export interface Position {
  lat: number;
  lng: number;
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
