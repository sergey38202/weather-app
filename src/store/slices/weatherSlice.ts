import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {ESliceType, IWeatherState} from "../constants";


const initialState: IWeatherState = {
    loading: false,
    error: null,
    weatherData: null,
};

const weatherSlice = createSlice({
    name: ESliceType.WEATHER,
    initialState,
    reducers: {
        getWeatherStart(state) {
            state.loading = true;
            state.error = null;
            state.weatherData = null;
        },
        getWeatherSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.weatherData = action.payload;
        },
        getWeatherFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getWeatherStart,
    getWeatherSuccess,
    getWeatherFailure,
} = weatherSlice.actions;

export default weatherSlice.reducer;

export const fetchWeather = (city: string) => async (dispatch: any) => {
    try {
        dispatch(getWeatherStart());
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
        );
        dispatch(getWeatherSuccess(response.data));
    } catch (error: any) {
        dispatch(getWeatherFailure(error.message));
    }
};