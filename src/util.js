import { Circle, Popup } from 'react-leaflet';
import numeral from 'numeral';

const casesTypeColors = {
    cases: {
      hex: "#3366ff",
      mulitiplier: 800,
    },
  
    recovered: {
      hex: "#7DD71D",
      mulitiplier: 1200,
    },
  
    deaths: {
      hex: "#e60000",
      mulitiplier: 2000,
    },
};


export const prettyPrintStat = (stat, showPlus = false) => {
    let ans = stat ? `${numeral(stat).format()}` : "0";
    if(showPlus) ans = "+" + ans;
    return ans;
}

export const showDataOnMap = (data, casesType='cases') => {
    {
        return ( 
            data.map(country => (
            <Circle  
                center={[country.countryInfo.lat, country.countryInfo.long]}   
                fillOpacity={0.4}
                pathOptions={{
                    color: casesTypeColors[casesType].hex,
                    fillColor: casesTypeColors[casesType].hex,
                }} 
                radius={
                    Math.sqrt(country[casesType] / 10) *
                    casesTypeColors[casesType].mulitiplier
                }
            >
                <Popup>
                    <div className="info-container">
                    <div
                        className="info-flag"
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                    />
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed">
                        Cases: {numeral(country.cases).format("0,0")}
                    </div>
                    <div className="info-recovered">
                        Recovered: {numeral(country.recovered).format("0,0")}
                    </div>
                    <div className="info-deaths">
                        Deaths: {numeral(country.deaths).format("0,0")}
                    </div>
                    </div>
                </Popup>
            </Circle>
        )))
    }
}