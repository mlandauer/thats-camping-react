// This is the form of the data as it is in data_simplified.json
export interface CampsitesJson {
  campsites: {
    id: number;
    name: string;
    description: string;
    position: Position | {};
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
  position: Position | undefined;
  facilities: Facilities;
  access: Access;
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
  caravans: boolean | undefined;
  trailers: boolean | undefined;
  car: boolean | undefined;
}

export interface Facilities {
  toilets: "flush" | "non_flush" | "none" | undefined;
  picnicTables: boolean | undefined;
  barbecues: "wood" | "gas_electric" | "none" | undefined;
  showers: "hot" | "cold" | "none" | undefined;
  drinkingWater: boolean | undefined;
}
