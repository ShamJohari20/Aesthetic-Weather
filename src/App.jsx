
import { useState } from "react"
import "./App.css"

const App = () => {

    const [city, setCity] = useState('')
    const [data, setData] = useState([])
    const [temp, setTemp] = useState(false)

    const getData = () => {
        const url = "https://api.weatherapi.com/v1/forecast.json?key=7d416e44242a4c9fa0481246252204"
        fetch(`${url}&q=${city}&days=7`)
            .then(Response => Response.json())
            .then(Data => {
                console.log(Data)
                setData(Data)
                setTemp(true)
                setCity('')

            })
    }

    return (
        <>

                <div id="main">
                    <h1 id="hed">The Weather Knows the Mood of Your City</h1>
                    <div id="child1">
                        <input id="ibox" type="text"
                            placeholder="Enter The City..."
                            value={city}
                            onChange={(event) => { setCity(event.target.value) }}
                        />
                        <button onClick={() => getData()} id="s-btn">Fill The Vibe</button>
                    </div>

                    {temp && <>
                        <div className="child2">
                            <img src={data.current.condition.icon} alt="" />
                            <h1>{data.current.temp_c}°C</h1>
                            <h2>{data.current.condition.text}</h2>
                            <h2>{data.location.name}</h2>
                            <h3>{data.location.region}</h3>
                            <h4>{data.location.country}</h4>
                        </div>
                        <div className="child3">
                            <h3>Sunrise:{data.forecast.forecastday[0].astro.sunrise}</h3>
                            <h3>Sunset:{data.forecast.forecastday[0].astro.sunset}</h3>
                            <h3>Max:{data.forecast.forecastday[0].day.maxtemp_c}°C</h3>
                            <h3>Min:{data.forecast.forecastday[0].day.mintemp_c}°C</h3>
                        </div>

                        <div className="child4">
                            {data.forecast.forecastday[0].hour
                                .filter(item => {
                                    const time = item.time.slice(-5); // get "HH:MM"
                                    return ["00:00", "06:00", "12:00", "18:00"].includes(time);
                                })
                                .map((item, index) => {
                                    const time = item.time.slice(-5);
                                    const timeLabels = {
                                        "00:00": "Night",
                                        "06:00": "Morning",
                                        "12:00": "Afternoon",
                                        "18:00": "Evening"
                                    };
                                    const label = timeLabels[time] || "Time";
                                    return (
                                        <div key={index} id="hour">
                                            <h5>{label}</h5>
                                            <img src={item.condition.icon} width={30} />
                                            <h5>{item.temp_c}°C</h5>
                                            <h5>{time}</h5>
                                        </div>
                                    );
                                })
                            }
                        </div>

                        <div>

                        </div>

                    </>}

                </div>

        </>
    )
}

export default App