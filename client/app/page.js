'use client';
import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [cityInfo, setCityInfo] = useState(null);
  const [loading, setLoading] = useState(false); 

  const fetchWeather = async () => {
    try {
      setLoading(true); 
      const res = await fetch(`${process.env.NEXT_PUBLIC_KEY}/api/weather?city=${city}`);
      const data = await res.json();

      if (res.ok) {
        setForecast(data);
        setCityInfo(data.city);
        setError('');
      } else {
        setForecast(null);
        setCityInfo(null);
        setError(data.error || 'City not found');
      }
    } catch (err) {
      setForecast(null);
      setCityInfo(null);
      setError('Failed to fetch data');
    } finally {
      setLoading(false); 
      setCity(''); 
    }
  };

  useEffect(() => {
    document.body.className = darkMode ? 'bg-dark text-light' : 'bg-light text-dark';
  }, [darkMode]);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold text-primary">🌦️ Real-Time Weather</h1>
        <button
          className={`btn btn-${darkMode ? 'light' : 'dark'} shadow-sm`}
          onClick={() => setDarkMode(!darkMode)}
        >
          Switch to {darkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>

      <SearchBar city={city} setCity={setCity} fetchWeather={fetchWeather} />

      {error && <p className="text-danger text-center mt-3">{error}</p>}

      {forecast && cityInfo && !loading && (
        <h3 className="text-center fw-semibold mt-4">
          {cityInfo.name}, {cityInfo.country}
        </h3>
      )}

      <div className="d-flex align-items-center gap-4 mt-4 flex-wrap justify-content-center">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <WeatherCard key={index} loading={true} />
            ))
          : forecast?.list?.slice(0, 5).map((item, index) => (
              <WeatherCard key={index} item={item} darkMode={darkMode} />
            ))}
      </div>
    </div>
  );
}
