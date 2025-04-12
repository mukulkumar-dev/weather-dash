"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SearchBar({ city, setCity, fetchWeather }) {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSuggestions = async (query) => {
    if (!query) return setSuggestions([]);

    setIsLoading(true);

    try {
      const res = await axios.get(`/api/cities`, {
        params: { namePrefix: query },
      });
      setSuggestions(res.data);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchSuggestions(city);
    }, 300);
    return () => clearTimeout(debounce);
  }, [city]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
      setCity("");
    }
  };
  return (
    <div className="d-flex flex-column align-items-center position-relative w-100">
      <div className="d-flex w-50 mb-2">
        <input
          type="text"
          className="form-control me-2 border-primary shadow-sm"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          className="btn btn-outline-primary px-4 shadow-sm"
          onClick={() => {
            fetchWeather();
            setCity("");
          }}
        >
          Get Forecast
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="list-group w-50 shadow-sm position-absolute z-3 bg-white">
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              className="list-group-item list-group-item-action"
              onClick={() => {
                setCity(item.city);
                setSuggestions([]);
              }}
              style={{ cursor: "pointer" }}
            >
              {item.city}, {item.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}