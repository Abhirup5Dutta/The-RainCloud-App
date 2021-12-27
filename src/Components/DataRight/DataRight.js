import React from 'react'
import './DataRight.css';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

function DataRight({ city, country, sunrise, sunset, sunriseTimeState, sunsetTimeState, maxtemp, mintemp, desc, feelsLike, isToggled, setQuery, query, setCoords, setFinalSearch, error }) {

    const handleChange = (e) => {
        setQuery(e.target.value);

        if (e.key === 'Enter') {
            if (query !== '') {
                setFinalSearch(query);
                setCoords(false);

            } else {
                alert('Type something in searchbox to search');
            }
        }
    }

    const searchWeather = (e) => {
        e.preventDefault();

        if (query !== '') {
            setFinalSearch(query);
            setCoords(false);

        } else {
            alert('Type something in searchbox to search');
        }

    }

    const searchWeatherCoords = (e) => {
        e.preventDefault();

        setQuery('');
        setCoords(true);
    }

    return (
        <div className='dataRight'>
            <span className='dataRight__CityCountry'>
                <button className='dataRight__Search__Location' onClick={searchWeatherCoords}>
                    <i className="fas fa-map-marker-alt" style={{ color: 'white', fontSize: '1.5rem' }}></i>
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                {
                    !error &&
                    <p className='dataRight__CityCountry__Info'>{city}, {country}</p>
                }
            </span>
            <form className="dataRight__Search" onSubmit={searchWeather}>
                <input type="text" className='dataRight__Search__Input' onChange={handleChange} value={query} />
                <button type='submit' className='dataRight__Search__Button' onClick={searchWeather}>
                    <i className="fas fa-search" style={{ color: 'white', fontSize: '1.2rem' }} ></i>
                </button>
            </form>

            {
                !error &&
                <div className="dataRight__ClockPaart">
                    <div className="dataRight__ClockPaart__Sun">
                        <p className='dataRight__ClockPaart__Sun__Head'>Sunrise</p>
                        <Clock value={sunrise} renderNumbers={true} />
                        <p className='dataRight__ClockPaart__Sun__Time'>{sunriseTimeState}</p>
                    </div>

                    <div className="dataRight__ClockPaart__Sun">
                        <p className='dataRight__ClockPaart__Sun__Head'>Sunset</p>
                        <Clock value={sunset} renderNumbers={true} />
                        <p className='dataRight__ClockPaart__Sun__Time'>{sunsetTimeState}</p>
                    </div>
                </div>
            }

            {
                !error &&
                <div className="dataRight__InfoBreak">
                    <div className='dataRight__InfoBreak__BreakLine' />
                    <i className="fas fa-info-circle" style={{ color: '#8D83DF', fontSize: '1.6rem', backgroundColor: 'white', borderRadius: '25px', cursor: 'pointer' }}></i>
                </div>
            }

            {
                !error &&
                <div className="dataRight__Details">
                    <div className="dataRight__Details__Categories">
                        <p className='dataRight__Details__Categories__Cat'>Maximum Temp :</p>
                        <p className='dataRight__Details__Categories__Cat'>Minimum Temp :</p>
                        <p className='dataRight__Details__Categories__Cat'>Feels like :</p>
                        <p className='dataRight__Details__Categories__Cat'>Weather Desc :</p>
                    </div>

                    <div className="dataRight__Details__Infos">
                        <p className='dataRight__Details__Infos__Cat'>{maxtemp}&deg;{isToggled ? 'F' : 'C'}</p>
                        <p className='dataRight__Details__Infos__Cat'>{mintemp}&deg;{isToggled ? 'F' : 'C'}</p>
                        <p className='dataRight__Details__Infos__Cat'>{feelsLike}&deg;{isToggled ? 'F' : 'C'}</p>
                        <p className='dataRight__Details__Infos__Cat'>{desc}</p>
                    </div>
                </div>
            }



        </div>
    )
}

export default DataRight
