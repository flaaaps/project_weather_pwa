import React, { useEffect, useState } from 'react';

import { fetchWeather } from './api/fetchWeather';

import './App.css';
import Header from "./components/header.js";
import Search from "./components/search.js";
import WeatherCard from "./components/WeatherCard.js";

import Logo from './assets/png/logo-250x250.png'

const App = () => {
    const [previousQuery, setPreviousQuery] = useState('')
    const [weather, setWeather] = useState({});

    const [hidden, setHidden] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState(navigator.language.split("-")[1].toLocaleLowerCase())
    const [canToggleLang, setCanToggleLang] = useState(true)

    const langToggleTimeout = 750

    useEffect(() => {
        updateWeatherCardLanguage()
        // eslint-disable-next-line
    }, [currentLanguage])

    const updateWeatherCardLanguage = () => {
        if (previousQuery && canToggleLang) {
            setCanToggleLang(false)
            setHidden(true)
            const promises = [fetchWeather(previousQuery, currentLanguage)
                .then(data => {
                    setWeather(data);
                    setHidden(false)
                    console.log("First one won")
                }),
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        console.log("Sec one won")
                        resolve()
                    }, langToggleTimeout)
                })]
            Promise.all(promises)
                .then(() => {
                    console.log("All done")
                    setCanToggleLang(true)
                })
        }
    }

    const search = async (e, query, type) => {
        if (e.key === 'Enter' || type === "btn") {
            setHidden(true)
            const data = await fetchWeather(query, currentLanguage);

            setWeather(data);
            setPreviousQuery(query)
            setTimeout(() => {
                setHidden(false)
            }, 200)
        }
    }

    return (
        <div className="App">
            <Header passCurrentLanguage={setCurrentLanguage} canToggleLang={canToggleLang}/>
            <div className="main-container">
                <img className="logo-brand" src={Logo} width="100" alt="Logo"/>
                <Search searchWithData={search}/>
                {weather.main && (
                    <WeatherCard hidden={hidden} weather={weather}/>
                )}
            </div>
        </div>
    );
}

export default App;