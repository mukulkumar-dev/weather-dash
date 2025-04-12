"use client";
import {
  WiHumidity,
  WiStrongWind,
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

const getWeatherIcon = (main) => {
  switch (main) {
    case "Clear":
      return <WiDaySunny size={48} color="#f39c12" />;
    case "Clouds":
      return <WiCloudy size={48} color="#95a5a6" />;
    case "Rain":
      return <WiRain size={48} color="#3498db" />;
    case "Snow":
      return <WiSnow size={48} color="#00BCD4" />;
    case "Thunderstorm":
      return <WiThunderstorm size={48} color="#9b59b6" />;
    default:
      return <WiCloudy size={48} color="#7f8c8d" />;
  }
};

export default function WeatherCard({ item, loading }) {
  if (loading) {
    return (
      <div className="col-md-2 col-sm-6 col-10">
        <div className="card shadow-sm border-0 rounded-4 p-3 h-100 text-center bg-light bg-gradient">
          <div className="placeholder-glow mb-2">
            <span className="placeholder col-6"></span>
          </div>
          <div className="my-2">
            <div
              className="bg-secondary bg-opacity-25 rounded-circle mx-auto"
              style={{ width: 48, height: 48 }}
            ></div>
          </div>
          <p className="placeholder-glow">
            <span className="placeholder col-8"></span>
          </p>
          <p className="placeholder-glow">
            <span className="placeholder col-6"></span>
          </p>
          <div className="d-flex justify-content-around">
            <div className="placeholder-glow col-4">
              <span className="placeholder col-12"></span>
            </div>
            <div className="placeholder-glow col-4">
              <span className="placeholder col-12"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!item || !item.dt_txt || !item.weather || !item.main || !item.wind) {
    return null;
  }

  return (
    <div className="col-md-2 col-sm-6 col-10">
      <div className="card shadow-sm border-0 rounded-4 p-3 h-100 text-center bg-light bg-gradient hover-shadow transition">
        <h6 className="fw-semibold text-secondary">
          {new Date(item.dt_txt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </h6>
        <div className="my-2">{getWeatherIcon(item.weather[0].main)}</div>
        <p className="mb-1 text-capitalize text-dark-emphasis">
          {item.weather[0].description}
        </p>
        <p className="mb-2">
          <span className="fw-bold h5">{item.main.temp}°C</span>
        </p>
        <div className="d-flex justify-content-around align-items-center">
          <div className="text-secondary" title="Humidity">
            <WiHumidity size={24} /> <small>{item.main.humidity}%</small>
          </div>
          <div className="text-secondary" title="Wind Speed">
            <WiStrongWind size={24} /> <small>{item.wind.speed} m/s</small>
          </div>
        </div>
      </div>
    </div>
  );
}
