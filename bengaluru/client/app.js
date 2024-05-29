function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for(var i in uiBathrooms) {
    if(uiBathrooms[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; 
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for(var i in uiBHK) {
    if(uiBHK[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1;
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  let sqft = document.getElementById("uiSqft");
  let bhk = getBHKValue();
  let bathrooms = getBathValue();
  let location = document.getElementById("uiLocations");
  let estPrice = document.getElementById("uiEstimatedPrice");

  let url = "http://127.0.0.1:5000/predict_home_price"; 

  $.post(url, {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value
  },function(data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " </h2>";
      console.log(status);
  });
}

function onPageLoad() {
  console.log("document loaded");
  let url = "http://127.0.0.1:5000/get_location_names";
  // let url = "/api/get_location_names";  //for nginx

  fetch(url)
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      // Get the select element by its ID
      const uiLocationsElement = document.getElementById("uiLocations");

      // Create option elements from the locations array and append them to the select element
      data.locations.forEach(location => {
        const optionElement = document.createElement('option');
        optionElement.value = location;
        optionElement.textContent = location;
        uiLocationsElement.appendChild(optionElement);
      });
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}
window.onload = onPageLoad;