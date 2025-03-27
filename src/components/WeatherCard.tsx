import styled from '@emotion/styled';
import { WeatherData } from '../types/weather';

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 15px;
  width: 100%;
  max-width: 300px;
  min-width: 150px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  margin: 0 auto;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-5px);
    }
  }

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 14px;
  }

  /* 适配超小屏幕 */
  @media (max-width: 320px) {
    padding: 10px;
    font-size: 12px;
  }
`;

const DateText = styled.div`
  font-size: 1.1em;
  color: #666;
  margin-bottom: 8px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1em;
    margin-bottom: 6px;
  }
`;

const Temperature = styled.div`
  font-size: 2em;
  font-weight: bold;
  color: #333;
  margin: 8px 0;

  @media (max-width: 768px) {
    font-size: 1.8em;
    margin: 6px 0;
  }
`;

const WeatherIcon = styled.img`
  width: 64px;
  height: 64px;
  margin: 8px auto;
  -webkit-user-drag: none;

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    margin: 6px auto;
  }
`;

const WeatherDescription = styled.div`
  color: #666;
  margin: 8px 0;
  font-size: 1.1em;

  @media (max-width: 768px) {
    font-size: 1em;
    margin: 6px 0;
  }
`;

const TemperatureRange = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  color: #666;
  margin-top: 8px;
  font-size: 0.9em;

  span {
    display: flex;
    align-items: center;
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-top: 6px;
    font-size: 0.85em;
  }

  /* 在超小屏幕上改为垂直布局 */
  @media (max-width: 320px) {
    flex-direction: column;
    gap: 4px;
  }
`;

interface WeatherCardProps {
  data: WeatherData;
}

export const WeatherCard = ({ data }: WeatherCardProps) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const weekDay = new Intl.DateTimeFormat('zh-CN', { weekday: 'long' }).format(date);
    const monthDay = new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric' }).format(date);
    return `${weekDay} ${monthDay}`;
  };

  return (
    <Card>
      <DateText>{formatDate(data.dt)}</DateText>
      <WeatherIcon 
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt={data.weather[0].description}
        loading="lazy"
      />
      <Temperature>{Math.round(data.temp.day)}°C</Temperature>
      <WeatherDescription>{data.weather[0].description}</WeatherDescription>
      <TemperatureRange>
        <span>最高: {Math.round(data.temp.max)}°C</span>
        <span>最低: {Math.round(data.temp.min)}°C</span>
      </TemperatureRange>
    </Card>
  );
}; 