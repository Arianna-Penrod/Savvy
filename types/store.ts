export type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export type Store = {
  name: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
};

export type CheapestProduct = {
  store: string;
  price: number;
};