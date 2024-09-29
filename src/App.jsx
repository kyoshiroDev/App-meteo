import { useState, useEffect } from "react";
import loader from "./assets/loader.svg";
import browser from "./assets/browser.svg";
import "./App.css";
const APIKEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
	const [weatherData, setWeatherData] = useState(null);
	const [errorInfo, setErrorInfo] = useState(null);

	useEffect(() => {
		fetch(`http://api.airvisual.com/v2/nearest_city?key=${APIKEY}`)
			.then((response) => {
				// Erreur non gérer par le catch
				// 400 - 499 : Erreur client
				// 500 - 599 : Erreur serveur
				if (!response.ok)
					throw new Error(`error ${response.status}, ${response.statusText}`);
				return response.json();
			})
			.then((responseData) => {
				console.log(responseData);
				setWeatherData({
					city: responseData.data.city,
					country: responseData.data.country,
					temperature: responseData.data.current.weather.tp,
					iconID: responseData.data.current.weather.ic,
				});
			})
			.catch((err) => {
				setErrorInfo(err.message);
			});
	}, []);

	return (
		<main>
			<div
				className={`loader-container ${
					!weatherData && !errorInfo && "active"
				}`}>
				<img
					src={loader}
					alt='loading icon'
				/>
			</div>
			{weatherData && (
				<>
					<p className='city-name'>{weatherData.city}</p>
					<p className='country-name'>{weatherData.country}</p>
					<p className='temperature'>{weatherData.temperature}°</p>
					<div className='info-icon-container'>
						<img
							className='info-icon'
							src={`/icons/${weatherData.iconID}.svg`}
							alt='weather icon'
						/>
					</div>
				</>
			)}
			{errorInfo && !weatherData && (
				<>
					<p className='error-information'>{errorInfo}</p>
					<img
						src={browser}
						alt='error icon'
					/>
				</>
			)}
		</main>
	);
}

export default App;
