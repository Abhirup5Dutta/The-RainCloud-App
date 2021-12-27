import React from 'react'
import './TempSwitch.css';
import cx from 'classnames';

function TempSwitch({ rounded = false, isToggled, onToggle }) {

    const sliderCX = cx('tempSwitch__slider', {
        'rounded': rounded
    })

    return (
        <label className='tempSwitch'>
            <input type='checkbox' checked={isToggled} onChange={onToggle} />
            <span className={sliderCX} >
                <p className='tempSwitch__Options'>
                    &deg;C
                    &nbsp;
                    &deg;F
                </p>
            </span>
        </label>
    )
}

export default TempSwitch
