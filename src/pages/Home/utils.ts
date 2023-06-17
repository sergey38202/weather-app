import ThunderstormImage from "../../assets/thunderstorm.jpeg";
import DrizzleImage from "../../assets/drizzle.jpeg";
import RainImage from "../../assets/rain.webp";
import SnowImage from "../../assets/snow.webp";
import AtmosphereImage from "../../assets/atmosphere.jpeg";
import ClearImage from "../../assets/clear.jpeg";
import CloudsImage from "../../assets/clouds.webp";
import DefaultWeatherImage from "../../assets/default-weather.jpeg";
import {EWeatherState} from "./types";
export const getBackgroundImage = (weatherState: EWeatherState): string => {
    switch (weatherState) {
        case EWeatherState.Thunderstorm:
            return ThunderstormImage;
        case EWeatherState.Drizzle:
            return DrizzleImage;
        case EWeatherState.Rain:
            return RainImage;
        case EWeatherState.Snow:
            return SnowImage;
        case EWeatherState.Atmosphere:
            return AtmosphereImage;
        case EWeatherState.Clear:
            return ClearImage;
        case EWeatherState.Clouds:
            return CloudsImage;
        default:
            return DefaultWeatherImage;
    }
};