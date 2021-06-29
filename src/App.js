import './App.css';
import 'leaflet/dist/leaflet.css';

import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import axios from 'axios';

//  Custom components 
import InfoBox from './InfoBox.js';
import Map from './Map.js';
import Table from './Table.js';
import LineGraph from './LineGraph.js';

import { prettyPrintStat } from './util';

function App() {
  const [country, setCountry] = useState('Worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [center, setCenter] = useState([34,-40]);
  const [zoom, setZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');

  useEffect(() => {
    const getCountriesList = async () => {
      const { data } = await axios.get("https://disease.sh/v3/covid-19/countries");
      
      const countries = data.map(country => country.country);

      setCountries(countries);
      setCountryInfo(data);
      setMapCountries(data);  
    }
    
    getCountriesList();
  }, []);


  const onCountryChange = async (e) => {
    const country = e.target.value;

    const url = country == "Worldwide" ? 
      "https://disease.sh/v3/covid-19/countries" : `https://disease.sh/v3/covid-19/countries/${country}`;
    
    const {data} = await axios.get(url);

    setCountry(country);
    setCountryInfo(data);

    if(country == 'Worldwide') {
      setCenter([34, -40]);
      setZoom(2);
    } 
    else {
      setCenter([data.countryInfo.lat, data.countryInfo.long]);
      setZoom(4);
    }    
  };


  return (
    <div className="app">
    
    <div className="app__left">
        <div className="app__header">
          <h1> COVID-19 Tracker </h1>

          <FormControl className="app__dropdown">
            <Select variant='outlined' value={country} onChange={onCountryChange}>
              <MenuItem value='Worldwide'> Worldwide </MenuItem>
              {
                countries.map(country => (
                  <MenuItem value={country}> {country} </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>

        <br />

        <div className="app__stats">
          <InfoBox 
            active={casesType==='cases'}
            title='COVID cases' 
            total={prettyPrintStat(countryInfo.cases)} 
            cases={prettyPrintStat(countryInfo.todayCases, true)}
            onClick={e => setCasesType('cases')}
            casesType={casesType}
          />

          <InfoBox 
            active={casesType==='recovered'}
            title='Recovered' 
            total={prettyPrintStat(countryInfo.recovered)} 
            cases={prettyPrintStat(countryInfo.todayRecovered, true)}
            onClick={e => setCasesType('recovered')}
            casesType={casesType}
          />

          <InfoBox 
            active={casesType==='deaths'}
            title='Deaths' 
            total={prettyPrintStat(countryInfo.deaths)} 
            cases={prettyPrintStat(countryInfo.todayDeaths, true)}
            onClick={e => setCasesType('deaths')}
            casesType={casesType}
          />
        </div>

        <Map countries={mapCountries} center={center} zoom={zoom} casesType={casesType}/>
    </div>

    <div className="app__right">
      <Card>
        <CardContent>
          <h3> Live cases by country </h3>
          <Table/>
        </CardContent>
      </Card>

      <Card className="lineGraph">
        <CardContent>
          <h3> Worldwide new {casesType} </h3>
          <LineGraph casesType={casesType}/>
        </CardContent>
      </Card>
      
    </div>

    </div>
  );
}

export default App;
