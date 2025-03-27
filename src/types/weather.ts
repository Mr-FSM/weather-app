export interface WeatherData {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  humidity: number;
  wind_speed: number;
}

export interface WeatherResponse {
  daily: WeatherData[];
  city: {
    name: string;
    country: string;
  };
} 