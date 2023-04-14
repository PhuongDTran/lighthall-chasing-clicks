import * as React from 'react';
import "./App.css"

function App() {

  const [clicksByCountry, setClicksByCountry] = React.useState([
    {
      id: 0,
      country: "United States",
      numClicks: 0
    },
    {
      id: 1,
      country: "France",
      numClicks: 0
    },
    {
      id: 2,
      country: "Japan",
      numClicks: 0
    }
  ]);

  const [currentCountry, setCurrentCountry] = React.useState(0);

  // load session storage if exists on inital render
  React.useEffect(() => {
    const country = window.sessionStorage.getItem("currentCountry");
    if (country !== null) {
      setCurrentCountry(country)
    }
    const clicks = window.sessionStorage.getItem("clicksByCountry");
    if (clicks !== null) {
      setClicksByCountry(JSON.parse(clicks));
    }
  },[])

  const handleClickMe = () => {
    const updatedClicksByCountry = [...clicksByCountry];
    updatedClicksByCountry[currentCountry].numClicks++;
    setClicksByCountry(updatedClicksByCountry);
    window.sessionStorage.setItem("clicksByCountry", JSON.stringify(updatedClicksByCountry));

  }

  const handleCountrySelect = event => {
    const country = event.target.value;
    setCurrentCountry(country);
    window.sessionStorage.setItem("currentCountry", country);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "auto", textAlign: "center", alignItems: "center", justifyContent: "center" }}>
      <div>
        <label htmlFor="country">Geolocation simulator:</label>
        <select name="country" id="country" onChange={handleCountrySelect} value={currentCountry}>
          {
            clicksByCountry.map(v => {
              return (
                <option value={v.id} key={v.id}>{v.country}</option>
              )
            })
          }
        </select>
        <button onClick={handleClickMe}> Click me!</button>
      </div>
      <div>
        <label>Number of clicks by countries</label>
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>Clicks</th>
            </tr>
          </thead>
          <tbody>
            {
              // const tableRows = [];
              clicksByCountry.map(v => {
                return (
                  <tr key={v.id}>
                    <td>{v.country}</td>
                    <td>{v.numClicks}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
