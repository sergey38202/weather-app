import axios from "axios";

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '6410c16d00d6c8041b4465f1a88686b6';

export const fetchWeather = async (query) => {
    const { data } = await  axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY,
        }
    });

    return data;
}