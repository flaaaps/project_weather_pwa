import { motion } from "framer-motion";
import React from "react";

function WeatherCard({ hidden, weather }) {
    return(
        <motion.div
            animate={{ scale: hidden ? 0.5 : 1, opacity: hidden ? 0 : 1, rotateY: hidden ? 0 : 360 }}
            transition={{ type: "spring", duration: 0.75, bounce: 0.25 }}
            initial={{ scale: 0.5, opacity: 1, rotateY: 360 }} className="city">
            <h2 className="city-name">
                <span>{weather.name}</span>
                <sup>{weather.sys.country}</sup>
            </h2>
            <div className="city-temp">
                {Math.round(weather.main.temp)}
                <sup>&deg;C</sup>
            </div>
            <div className="info">
                <img className="city-icon"
                     src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                     alt={weather.weather[0].description}/>
                <p>{weather.weather[0].description}</p>
            </div>
        </motion.div>
    )
}

export default WeatherCard