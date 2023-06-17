export interface IWeatherState {
    loading: boolean;
    error: string | null;
    weatherData: any;
}

export enum ESliceType {
    WEATHER = 'weather',
}