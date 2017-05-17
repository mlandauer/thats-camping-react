export interface Campsite {
  id: string;
  name: string;
  starred: boolean;
  park: Park;
  position: Position;
}

export interface Position {
  lat: number;
  lng: number;
}

export interface Park {
  name: string;
}
