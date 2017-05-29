// This is the form of the data as it is in data_simplified.json
export interface CampsitesJson {
  campsites: CampsiteOriginal[];
  parks: ParkOriginal[];
}

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

export interface CampsiteOriginalWithPark extends CampsiteOriginal {
  park: ParkOriginal;
}

// This is the form of the park data as it is in data_simplified.json
export interface ParkOriginal {
  id: number;
  name: string;
  description: string;
  campsite_ids: number[];
}

export interface Park extends ParkOriginal {
  campsites: Campsite[];
}

export interface Campsite extends CampsiteOriginalWithPark {
  starred: boolean;
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
  toilets: "flush" | "non_flush" | "none";
  picnicTables: boolean;
  barbecues: "wood" | "gas_electric" | "none";
  showers: "hot" | "cold" | "none";
  drinkingWater: boolean;
}
