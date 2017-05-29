// This is the form of the data as it is in data_simplified.json
export interface CampsitesJson {
  campsites: {
    id: number;
    name: string;
    description: string;
    position: Position;
    facilities: Facilities;
    access: Access;
    park_id: number;
  }[];
  parks: {
    id: number;
    name: string;
    description: string;
    campsite_ids: number[];
  }[];
}

// This is the how campsites are stored in the state
export interface Campsite {
  id: number;
  name: string;
  description: string;
  position: Position;
  facilities: Facilities;
  access: Access;
  park_id: number;
  parkName: string;
}

// This is how campsites are in the props
export interface CampsiteWithStarred extends Campsite {
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
