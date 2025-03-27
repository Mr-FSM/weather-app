import axios from 'axios';
import { WeatherResponse } from '../types/weather';

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

export const getWeatherData = async (cityName: string): Promise<WeatherResponse> => {
  try {
    // 1. 首先获取城市的经纬度
    const geoResponse = await axios.get(GEOCODING_URL, {
      params: {
        name: cityName,
        count: 1,
        language: 'zh',
        format: 'json'
      },
    });

    if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
      throw new Error('City not found');
    }

    const location = geoResponse.data.results[0];

    // 2. 使用经纬度获取天气数据
    const weatherResponse = await axios.get(WEATHER_URL, {
      params: {
        latitude: location.latitude,
        longitude: location.longitude,
        daily: 'weathercode,temperature_2m_max,temperature_2m_min',
        timezone: 'auto',
        forecast_days: 7
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const weatherData = weatherResponse.data;
    const dailyForecasts = weatherData.daily.time.map((date: string, index: number) => ({
      dt: new Date(date).getTime() / 1000,
      temp: {
        day: Math.round(weatherData.daily.temperature_2m_max[index]),
        min: Math.round(weatherData.daily.temperature_2m_min[index]),
        max: Math.round(weatherData.daily.temperature_2m_max[index])
      },
      weather: [{
        main: getWeatherDescription(weatherData.daily.weathercode[index]),
        description: getWeatherDescription(weatherData.daily.weathercode[index]),
        icon: getWeatherIcon(weatherData.daily.weathercode[index])
      }],
      humidity: 0,
      wind_speed: 0
    }));

    return {
      daily: dailyForecasts,
      city: {
        name: location.name,
        country: location.country || 'CN'
      }
    };
  } catch (error) {
    console.error('Weather API Error:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('API Response:', error.response.data);
    }
    throw new Error('获取天气数据失败，请检查城市名称是否正确');
  }
};

// WMO Weather interpretation codes (WW)
function getWeatherDescription(code: number): string {
  const weatherCodes: { [key: number]: string } = {
    0: '晴天',
    1: '晴间多云',
    2: '多云',
    3: '阴天',
    45: '雾',
    48: '雾凇',
    51: '小毛毛雨',
    53: '毛毛雨',
    55: '大毛毛雨',
    56: '冻毛毛雨',
    57: '强冻毛毛雨',
    61: '小雨',
    63: '中雨',
    65: '大雨',
    66: '冻雨',
    67: '强冻雨',
    71: '小雪',
    73: '中雪',
    75: '大雪',
    77: '雪粒',
    80: '小阵雨',
    81: '中阵雨',
    82: '大阵雨',
    85: '小阵雪',
    86: '大阵雪',
    95: '雷暴',
    96: '雷暴伴有冰雹',
    99: '大雷暴伴有冰雹'
  };
  return weatherCodes[code] || '未知天气';
}

function getWeatherIcon(code: number): string {
  // 简化的天气代码到图标映射
  if (code === 0) return '01d'; // 晴天
  if (code === 1 || code === 2) return '02d'; // 多云
  if (code === 3) return '03d'; // 阴天
  if (code >= 51 && code <= 67) return '10d'; // 各种雨
  if (code >= 71 && code <= 77) return '13d'; // 各种雪
  if (code === 45 || code === 48) return '50d'; // 雾
  if (code >= 95) return '11d'; // 雷暴
  return '01d'; // 默认晴天图标
}; 