"use client";
import {useState} from "react";
import "./page.module.css";

const API_KEY = "dff6dd2ff97754a80272c82885e9cc78";

// sam's first next js project - weather app for Beyza <3

// localhost:3000 - home page
// we are going to design the user interface
//  then we are going to call the openweather API
// show the user data based pff the API result (seatle -> seatle weather openweather API)


export default function Home() {

    const [cityInput, setCityInput] = useState({}); //seattle

    const [weatherData, setWeatherData] = useState<any>({}); //weather data

    async function getWeatherData() {
        console.log("button");
        //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
        //queyr data
        //if there is an error, throw error
        //if not save data
        try {
            const serverResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?` +
                "q=" +
                cityInput +
                "&appid=" +
                API_KEY +
                "&units=imperial"
            );
            const data = await serverResponse.json();
            console.log(data);
            if (data.cod === "404") throw data;
            setWeatherData(data);

        } catch (err) {
            console.log(err);
        }
    }

    console.log(cityInput);

    return (
        // Normalde tailwind css kulanacaktım fakat next js in css kütüphanesi ile devam edeceğim
        <div
            style={{
                backgroundImage: "url('https://littlevisuals.co/images/fresh_cut.jpg')",
                position: "static",
                height: "100vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                color: "black",
                fontFamily: "Inter",
                fontSize: "1.5rem",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
            }}
        >
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
                maxWidth: "40rem",
                height: "100%",
                maxHeight: "20rem",
                backgroundColor: "rgba(217,212,212,0.7)",
                padding: "1rem",
                borderRadius: "1rem",
                gap: "1rem",
            }}>
                <div>
                    <h2 style={{fontWeight: "600"}}>
                        Get The Weather!
                    </h2>
                    <p>Enter a city name, and get the weather!</p>
                </div>

                <div style={{display: "flex", justifyContent: "center", gap: "1rem"}}>
                    <input
                        onChange={(e) => {
                            setCityInput(e.target.value)
                        }} //c -> setCityInput("C")
                        style={{
                            width: "20rem",
                            height: "3rem",
                            padding: "0.5rem",
                            borderRadius: "0.6rem",
                            border: "none",
                            outline: "none",
                        }} type="text" placeholder="Enter a city name"/>
                    <button
                        onClick={() => getWeatherData()}
                        style={{
                            width: "6rem",
                            height: "3rem",
                            padding: "0.5rem",
                            borderRadius: "0.6rem",
                            border: "none",
                            outline: "none",
                            backgroundColor: "rgba(0,0,0,0.7)",
                            color: "white",
                            cursor: "pointer"
                        }}>Get Weather
                    </button>
                </div>

                <>
                    <div>
                        <h3>{weatherData?.name} Weather</h3>
                        <h3>
                            Currently{weatherData?.main?.temp} &deg;F
                        </h3>
                        {weatherData?.weather?.length > 0 ?
                            <img
                                src={"https://openweathermap.org/img/wn/" + weatherData?.weather[0]?.icon + "@4x.png"}
                                alt=""/> : null
                        }
                    </div>
                </>


            </div>
        </div>
    )
}
