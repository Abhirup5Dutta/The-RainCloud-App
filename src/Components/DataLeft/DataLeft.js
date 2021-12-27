import React, { useEffect, useState } from 'react'
import './DataLeft.css';
import Clock from 'react-live-clock-date-fns';
import DataCard from './DataCard/DataCard';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import TempSwitch from './TempSwitch/TempSwitch';

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    724: { items: 3 },
    1024: { items: 4 },
};

function DataLeft({ iconCode, temp, dateFinal, dateFinalDay, wind, humidity, rain, forecast, isToggled, onToggle }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const tempItems = [];

        const handleDragStart = (e) => e.preventDefault();

        forecast.forEach((elem) => {
            const { temperature, icon, day, date } = elem;
            tempItems.push(<DataCard temperature={temperature} icon={icon} day={day} isToggled={isToggled} key={date} onDragStart={handleDragStart} role="presentation" />);
        });

        setItems(tempItems);
    }, [forecast, isToggled]);

    return (
        <div className='dataLeft'>
            <div className="dataLeft__top">
                <img src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`} alt="weather icon" className='dataLeft__Icon' />
                <TempSwitch rounded={true} isToggled={isToggled} onToggle={onToggle} />
            </div>
            <div className="dataLeft__TeampDetails">
                <p className='dataLeft__TeampDetails__Temp'>{temp}<sup style={{ fontSize: '2rem' }}>&deg;{isToggled ? 'F' : 'C'}</sup></p>
                <p className='dataLeft__TeampDetails__Date'>{dateFinal}</p>
                <p className='dataLeft__TeampDetails__DayTime'>{dateFinalDay} &nbsp; | &nbsp; <Clock format='h:mm a' /></p>
            </div>
            <div className="dataLeft__TempInfo">
                <span className="dataLeft__TempInfo__Each">
                    <i className="fas fa-wind"></i>
                    &nbsp;&nbsp;&nbsp;
                    Wind &nbsp; {wind}km/hr
                </span>
                <span className="dataLeft__TempInfo__Each">
                    <i className="fas fa-tint"></i>
                    &nbsp;&nbsp;&nbsp;
                    Humidity &nbsp; {humidity}%
                </span>
                <span className="dataLeft__TempInfo__Each">
                    <i className="fas fa-cloud-rain" style={{ color: 'white', fontSize: '1.5rem' }}></i>
                    &nbsp;&nbsp;&nbsp;
                    Rain &nbsp; {rain}%
                </span>
            </div>
            <AliceCarousel mouseTracking items={items} controlsStrategy="alternate" responsive={responsive} disableDotsControls={true} keyboardNavigation={true} />
        </div>
    )
}

export default DataLeft
