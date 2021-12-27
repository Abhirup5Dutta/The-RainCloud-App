import React from 'react'
import './DataCard.css';

function DataCard({ temperature, icon, day, isToggled }) {
    return (
        <div className='dataCard'>
            <p className='dataCard__Temperature'>{temperature}<sup style={{ fontSize: 'small' }}>&deg;{isToggled ? 'F' : 'C'}</sup></p>
            <img className='dataCard__Icon' src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" />
            <p className='dataCard__Day'>{day}</p>
        </div>
    )
}

export default DataCard
