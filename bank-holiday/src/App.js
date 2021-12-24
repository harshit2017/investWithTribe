import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRangePicker } from 'react-date-range'
import moment from 'moment'
import CountryHoliday from './components/CountryHoliday'
import Togglable from './components/Togglable'
import { Container } from 'react-bootstrap'

let holidayCalender = {}



const App = () => {
  const [holidays, setHolidays] = useState({})
  const [startDate, setStartDate] = useState(moment().startOf('day')._d)
  const [endDate, setEndDate] = useState(moment().startOf('day')._d)

  const handleSelect = (ranges) => {
    const range = ranges.selection
    console.log(range)
    const newStartDate = moment(range.startDate).startOf('day')
    const newEndDate = moment(range.endDate).startOf('day')

    setStartDate(newStartDate._d)
    setEndDate(newEndDate._d)
    let newHolidays = {}
    for (const [cntry, holidays] of Object.entries(holidayCalender)) {
      newHolidays[cntry] = holidays.filter(holiday => {
        const date = moment(holiday.date).startOf('day')
        console.log('holiday Date', date)
        return date.isSameOrAfter(newStartDate) && date.isSameOrBefore(newEndDate)
      })
    }


    console.log('hello', newHolidays)
    setHolidays(newHolidays)

  }
  useEffect(() => {
    axios
      .get('https://www.gov.uk/bank-holidays.json')
      .then(response => {
        const data = response.data
        for (const [key, value] of Object.entries(data)) {
          holidayCalender[key] = value.events
        }
        setHolidays(holidayCalender)
        console.log('response successful')
      })
  }, [])

  console.log('carct', holidayCalender)
  console.log(moment().startOf('day')._d)
  const selectionRange = {
    startDate,
    endDate,
    key: 'selection',
  }

  return (
    <Container fluid>
      <h1>Holiday Calender</h1>
      <Togglable><DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
      /></Togglable>

      <CountryHoliday holidays={holidays} />
    </Container>
  )

}



export default App;
