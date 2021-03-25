type InformationType = {
  long_name: string;
  short_name: string;
  types: string[];
};

type BoundsType = {
  northeast: {
    lat: number;
    lng: number;
  };
  southwest: {
    lat: number;
    lng: number;
  };
};

type AddressesComponentsType = InformationType

type ResultMapType = {
  address_components: AddressesComponentsType[];
  formatted_address: string;
  geometry: {
    bounds: BoundsType;
    location: {
      lat: number;
      lng: number;
    };
    location_type: string;
    viewport: BoundsType;
  };
  place_id: string;
  types: string[]
}

export type MapAPIType = {
  results: ResultMapType[];
  status: string;
}