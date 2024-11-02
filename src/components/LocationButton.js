import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeather, resetCurrentWeather } from '../features/currentWeatherSlice';
import { fetchForecast } from '../features/forecastSlice';
import { resetCities } from '../features/citySlice';
import { resetForecast } from '../features/forecastSlice';
import { changeCurrentLocation } from '../features/currentLocationSlice';
import { fetchLocationKeyByCoordinates } from '../api/weatherApi';
import toast from 'react-hot-toast';

const LocationButton = () => {
  const dispatch = useDispatch();

  const handleLocationClick = () => {
    dispatch(resetCurrentWeather());
    dispatch(resetCities());
    dispatch(resetForecast());
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const locationData = await fetchLocationKeyByCoordinates(latitude, longitude);
            if (!locationData) {
              toast.error('Could not find location data');
              return;
            }

            // Dispatch actions to fetch weather and forecast based on location key
            await dispatch(fetchWeather(locationData.Key)).unwrap();
            await dispatch(fetchForecast(locationData.Key)).unwrap();
            dispatch(changeCurrentLocation(locationData));
            toast.success('Weather data for current location loaded');
          } catch (error) {
            console.error("Failed to fetch weather for location:", error);
            toast.error('Failed to fetch weather data.');
          }
        },
        () => {
          toast.error('Unable to retrieve location.');
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <button onClick={handleLocationClick}>
      My Location
    </button>
  );
};

export default LocationButton;