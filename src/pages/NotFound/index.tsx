import {NavLink} from "react-router-dom";
import React from "react";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-500 text-white">
            <h1 className="text-4xl font-bold mb-4">Error</h1>
            <p className="text-lg">Failed to fetch weather data. Please check the entered location and try again.</p>
            <NavLink
                to={"/"}
                className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
            >
                Go Back
            </NavLink>
        </div>
    )
}

export default NotFound;