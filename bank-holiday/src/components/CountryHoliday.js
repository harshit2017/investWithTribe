import React from 'react'

const CountryHoliday = ({ holidays }) => {
    console.log('ilu', holidays)
    const countries = Object.keys(holidays)
    return <div>
        {countries.map((country) => {
            return <div key={country}>

                <h3>{country.toUpperCase()}</h3>
                <div>
                <ol>
                    {holidays[country].map((holiday, idx) => <li key={idx}>{holiday.title} : {holiday.date}</li>)}
                </ol>
                </div>
            </div>

        })}
    </div>
}

export default CountryHoliday