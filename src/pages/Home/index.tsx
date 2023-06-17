import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RootState} from "../../store";
import {fetchWeather} from "../../store/slices/weatherSlice";
import {getBackgroundImage} from "./utils";
import {CALC_NUMBER, DEFAULT_COUNTRY_NAME} from "./constants";

const WeatherPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const [userLocation, setUserLocation] = useState('');
    const [searchLocation, setSearchLocation] = useState<string>('');
    const [backgroundImage, setBackgroundImage] = useState<string>('');

    const { weatherData: weather, error, loading } = useSelector((state: RootState) => state.weather);

    useEffect(() => {
        const fetchUserLocationWeather = async () => {
            try {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        const { latitude, longitude } = position.coords;
                        setUserLocation(`lat=${latitude}&lon=${longitude}`);
                    });
                }
            } catch (error) {
                console.log('Error getting user location:', error);
            }
        };

        fetchUserLocationWeather();
    }, []);

    const handleSearch = () => {
        if (searchLocation) {
            // @ts-ignore
            dispatch(fetchWeather(searchLocation));
            setSearchLocation('');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };


    useEffect(() => {
        // @ts-ignore
        dispatch(fetchWeather(searchLocation || DEFAULT_COUNTRY_NAME));
    }, [dispatch, userLocation, searchLocation]);

    useEffect(() => {
        if (weather) {
            setBackgroundImage(getBackgroundImage(weather.weather[0].main));
        }
    }, [weather]);

    if (loading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    if (error) {
        navigation("/404");
    }

    const temperatureCelsius = weather?.main?.temp - CALC_NUMBER;

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat`} style={{backgroundImage: `url(${backgroundImage})`}}>
            <div className="flex mb-4 items-baseline">
                <input
                    type="text"
                    className="rounded-l-lg py-2 px-4 border-t mr-0 mb-8 border-b border-l text-gray-800 border-gray-200 bg-white"
                    placeholder="Enter a location"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button
                    className="px-4 rounded-r-lg bg-blue-500 text-white font-semibold p-2 border-blue-700 border-t border-b border-r"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            {weather && (
                <div className="bg-white p-6 rounded-md">
                    <h2 className="text-2xl font-semibold mb-4">{weather.name}</h2>
                    <div className="flex items-center">
                        <img
                            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                            alt={weather.weather[0].description}
                            className="w-10 h-10 mr-2"
                        />
                        <p className="text-lg">{weather.weather[0].description}</p>
                    </div>
                    <div className="mt-4">
                        <p className="text-xl font-semibold">Weather Details</p>
                        <div className="flex flex-col mt-2">
                            <div className="flex justify-between">
                                <p className="text-gray-600">Temperature:</p>
                                <p className="text-gray-900">{temperatureCelsius.toFixed()}°C</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-600">Humidity:</p>
                                <p className="text-gray-900">{weather.main.humidity}%</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-600">Wind Speed:</p>
                                <p className="text-gray-900">{weather.wind.speed} m/s</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default WeatherPage;
