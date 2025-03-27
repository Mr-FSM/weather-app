import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { WeatherCard } from './components/WeatherCard';
import { getWeatherData } from './services/weatherApi';
import { WeatherResponse } from './types/weather';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #00b4db, #0083b0);
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px 10px;
  }
`;

const Header = styled.header`
  text-align: center;
  color: white;
  margin-bottom: 30px;
  padding: 0 15px;

  h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

    @media (max-width: 768px) {
      font-size: 2em;
      margin-bottom: 15px;
    }
  }

  h2 {
    font-size: 1.8em;
    margin: 15px 0;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);

    @media (max-width: 768px) {
      font-size: 1.5em;
      margin: 10px 0;
    }
  }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  gap: 10px;
  flex-wrap: wrap;
  padding: 0 15px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
    gap: 8px;
  }
`;

const SearchInput = styled.input`
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  border-radius: 25px;
  width: 100%;
  max-width: 300px;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  -webkit-appearance: none;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
    background: white;
  }

  @media (max-width: 768px) {
    padding: 10px 15px;
    font-size: 14px;
  }
`;

const SearchButton = styled.button`
  padding: 12px 30px;
  font-size: 16px;
  background: #0083b0;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: #006d94;
  }

  @media (hover: hover) {
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

const WeatherGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    padding: 0 10px;
  }
`;

const Message = styled.div<{ type?: 'error' | 'info' }>`
  color: white;
  text-align: center;
  margin: 20px auto;
  padding: 15px;
  border-radius: 10px;
  background: ${props => props.type === 'error' ? 'rgba(255, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
  max-width: 600px;

  @media (max-width: 768px) {
    margin: 15px auto;
    padding: 12px;
    font-size: 14px;
  }
`;

function App() {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [city, setCity] = useState('上海');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeatherData(city);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取天气数据失败');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather();
    }
  };

  return (
    <AppContainer>
      <Header>
        <h1>天气预报</h1>
        <form onSubmit={handleSearch}>
          <SearchContainer>
            <SearchInput
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="输入城市名称（如：上海、北京）"
              disabled={loading}
            />
            <SearchButton type="submit" disabled={loading || !city.trim()}>
              {loading ? '查询中...' : '搜索'}
            </SearchButton>
          </SearchContainer>
        </form>
      </Header>

      {loading && (
        <Message type="info">正在获取天气数据...</Message>
      )}

      {error && (
        <Message type="error">{error}</Message>
      )}

      {weatherData && !loading && !error && (
        <>
          <Header>
            <h2>{weatherData.city.name}</h2>
          </Header>
          <WeatherGrid>
            {weatherData.daily.map((day, index) => (
              <WeatherCard key={index} data={day} />
            ))}
          </WeatherGrid>
        </>
      )}
    </AppContainer>
  );
}

export default App;
