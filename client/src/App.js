import React, { useState } from "react";
import './bootstrap.css';

function App() {

  const [continent, setContinent] = useState("");
  const [countryList, setcountryList] = useState([]);

  const [country, setContry] = useState("");
  const [countryInfo, setContryInfo] = useState([]);

  const getList = async e => {
    e.preventDefault();
    try {
      const contry = await fetch(`http://localhost:8000/country/${continent}`);
      setcountryList(await contry.json());
    } catch (err) {
      console.error(err.message);
    }
  };

  const getInfo = async e => {
    e.preventDefault();
    try {
      const contryInfo = await fetch(`http://localhost:8000/countryinfo/${country}`);
      setContryInfo(await contryInfo.json());
      console.log(await contryInfo.json())
    } catch (err) {
      console.error(err.message);
    }
  };

  return (

    <div class="container">

      <form class="form-inline justify-content-center my-4">
        <div class="my-3" ><b><h5>Hello! If you write the name of the continent in the search, you will quickly find the countries that are in this continent.</h5></b></div>
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Write the name of the continent" value={continent} onChange={e => setContinent(e.target.value)}></input>
          <button class="btn btn-info" type="button" id="button-addon2" onClick={getList}>Search</button>
        </div>
      </form>

      <table class="table table-hover my-3 text-center">
        <thead>
          <tr>
            <th scope="col " class="text-primary">CountryCode</th>
            <th scope="col" class="text-primary">Country</th>
            <th scope="col" class="text-info">Continent</th>
            <th scope="col" class="text-info">Information</th>
          </tr>
        </thead>
        <tbody>

          {countryList.map(value => (
            <tr>
              <th class="text-primary">{value.countrycode}</th>
              <th class="text-primary">{value.country}</th>
              <th class="text-info">{value.continent}</th>
              <td>
                <form onSubmit={getInfo}>
                  <button class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#infoWindow" value={value.country} onClick={e => setContry(e.target.value)}>More</button>
                </form>
              </td>
            </tr>
          ))}

        </tbody>
      </table>

      {countryInfo.map(value =>(
              <div class="modal" id="infoWindow">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h2 class="modal-title text-warning" >{value.country}</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true"></span>
                    </button>
                  </div>
                  <div class="modal-body">
                  <p class="text-warning"><b>Country code: {value.countrycode}</b></p>
                  <p class="text-info"><b>Continent: {value.continent}</b></p>
                  <p class="text-warning"><b>Region: {value.region}</b></p>
                  <p class="text-info"><b>Country Population: {value.countrypopulation}</b></p>
                  <p class="text-warning"><b>Government Form: {value.governmentform}</b></p>
                  <p class="text-info"><b>Capital: {value.capital}</b></p>
                  <p class="text-warning"><b>District: {value.district}</b></p>
                  <p class="text-info"><b>City Population: {value.citypopulation}</b></p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
              ))}
              
    </div>
  );
}
export default App;
