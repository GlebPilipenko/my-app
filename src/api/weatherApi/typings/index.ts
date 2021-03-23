type MainType = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
};

type CityType = {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  },
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

export type ListType = {
  dt: string;
  main: MainType;
  weather: WeatherType[];
  clouds: {
    all: number;
  },
  wind: {
    speed: number;
    deg: number;
  },
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  },
  dt_txt: string;
};

export type WeatherType = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type WeatherAPIType = {
  cod: string;
  message: number;
  cnt: number;
  list: ListType[];
  city: CityType;
};
