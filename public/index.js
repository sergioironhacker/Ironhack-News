const getCountryInfo = countryName => {
    axios
      .get(`https://restcountries.com/v2/name/${countryName}?fullText=true`)
      .then(response => {
        const countryDetail = response.data[0];
        document.getElementById('country-name').innerText = countryDetail.name;
  
        // Mostrar "Capital: Nombre de la Capital" en un h3 y en negrita
        document.getElementById('country-capital').innerHTML = `<strong>Capital:</strong> ${countryDetail.capital}`;
  
        // Mostrar la población, área, código de país, región, etc.
        document.getElementById('country-population').innerHTML = `<strong>Population:</strong> ${countryDetail.population.toLocaleString()}`;
        document.getElementById('country-area').innerHTML = `<strong>Area:</strong> ${countryDetail.area} km²`;
        document.getElementById('country-code').innerHTML = `<strong>Country Code:</strong> ${countryDetail.alpha3Code}`;
        document.getElementById('country-region').innerHTML = `<strong>Region:</strong> ${countryDetail.region}`;
        document.getElementById('country-flag').setAttribute('src', countryDetail.flag);
        document.getElementById('country-currencies').innerHTML = `<strong>Currencies:</strong> ${countryDetail.currencies.map(currency => currency.name).join(', ')}`;
        document.getElementById('country-languages').innerHTML = `<strong>Languages:</strong> ${countryDetail.languages.map(language => language.name).join(', ')}`;
        document.getElementById('country-borders').innerHTML = `<strong>Borders:</strong> ${countryDetail.borders.join(', ')}`;
        document.getElementById('country-timezones').innerHTML = `<strong>Timezones:</strong> ${countryDetail.timezones.join(', ')}`;
        document.getElementById('country-callcode').innerHTML = `<strong>Calling Code:</strong> +${countryDetail.callingCodes.join(', +')}`;
    
        // ... otros detalles que desees mostrar
      })
      .catch(err => {
        console.log(err);
        err.response.status === 404 ? alert(`The country ${countryName} doesn't exist.`) : alert('Server error! Sorry.');
      });
  };
  
  document.getElementById('get-country-btn').addEventListener('click', () => {
    const userInput = document.getElementById('country-name-input').value;
    getCountryInfo(userInput);
  });
  