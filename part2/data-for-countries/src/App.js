import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'




const Find = (props) => (
  <form>
    find countries<input value={props.value} onChange={props.onChange} />
  </form>
)

const Result = (props) => {

  if (props.selectedCountries === undefined) {
    return (<p>Loading Countries</p>)
  } else if (props.selectedCountries.length > 10) {
    return (<p>Too many matches, specify another filter</p>)
  } else if (props.selectedCountries.length > 1) {
    return (
      <>
        <ul>
          {
            props.selectedCountries.map((countryName, i) => (
              <li key={i}>{countryName}<button value={countryName} onClick={() => {
                props.setFindValue(countryName)
                props.handleFindChange()
              }}>show</button></li>
            ))
          }
        </ul>

      </>
    )
  } else {
    if (props.countryInfo !== undefined) {
      // console.log(`props.countryInfo`, props.contryInfo.flag)
      var imgSrc = props.countryInfo.flag
      return (
        <>
          <h2>{props.countryInfo.name}</h2>
          <p>capital {props.countryInfo.capital}</p>
          <p>population {props.countryInfo.population}</p>

          <h3>Languages</h3>
          <ul>
            {
              Object.values(props.countryInfo.languages).map((lang, i) => (
                <li key={i}>{lang}</li>
              ))
            }
          </ul>
          <img src={imgSrc} alt="flag" />

          <h3>Weather in {props.countryInfo.capital}</h3>

        </>
      )
    } else {
      return (<p>Loading...</p>)
    }
  }
}

const App = () => {
  const [countryNames, setCountryNames] = useState()
  const [findValue, setFindValue] = useState('')
  const [selectedCountries, setSelectedCountries] = useState()
  const [countryInfo, setCountryInfo] = useState()

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(request => {
      var countryName = request.data.map(function (country) {
        return country.name.common
      })
      setCountryNames([...countryName])
      setSelectedCountries([...countryName])
    })
  }, [])

  const handleFindChange = (event) => {
    if (event !== undefined) {
      setFindValue(event.target.value)
      if (selectedCountries !== undefined) {
        setSelectedCountries(countryNames.filter(function (name) {
          return name.includes(event.target.value)
        }))
      }
    } else {
      setSelectedCountries(countryNames.filter(function (name) {
        return name.includes(findValue)
      }))
    }
  }



  useEffect(() => {
    if (selectedCountries !== undefined && selectedCountries.length === 1) {
      var link = "https://restcountries.com/v3.1/name/" + selectedCountries
      axios.get(link).then(result => {
        setCountryInfo({ name: result.data[0].name.common, capital: result.data[0].capital[0], population: result.data[0].population, languages: result.data[0].languages, flag: result.data[0].flags.png })
      })
    }
  }, [selectedCountries])

  return (
    <div className="App">
      <Find value={findValue} onChange={handleFindChange} />
      {Result({ selectedCountries: selectedCountries, findValue: findValue, countryInfo: countryInfo, setFindValue: setFindValue, handleFindChange: handleFindChange })}
    </div>
  );
}

export default App;
