function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for(var i in uiBathrooms) {
    if(uiBathrooms[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for(var i in uiBHK) {
    if(uiBHK[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  const sqft = parseFloat(document.getElementById("uiSqft").value);
  const bhk = getBHKValue();
  const bathrooms = getBathValue();
  const location = document.getElementById("uiLocations").value;

  // Create the data object to be sent
  const postData = {
    total_sqft: sqft,
    bhk: bhk,
    bath: bathrooms,
    location: location
  };

  console.log(postData); // For debugging

  // Send the POST request with 'no-cors' mode (for development/testing only)
  fetch('http://127.0.0.1:5000/predict_home_price', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData),
    mode: 'no-cors' // Client-side approach (for development/testing only)
  })
    .then(response => {
      if (response.ok) {
        console.log('Success: (Limited response due to no-cors)');
        // Update UI with estimated price (if possible with CORS)
      } else {
        console.error('Network response was not ok:', response.status);
        // Hide loading indicator
        hideLoadingIndicator();
        // Display user-friendly error message
        alert("An error occurred while estimating the price. Please try again later.");
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Hide loading indicator
      hideLoadingIndicator();
      // Display user-friendly error message
      alert("An error occurred while estimating the price. Please try again later.");
    });
}
//   fetch('http://127.0.0.1:5000/predict_home_price', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(postData),
//     mode: 'no-cors' // Client-side approach (for development/testing only)
//   })
//     .then(response => {
//       if (response.ok) {
//         console.log('Success: (Limited response due to no-cors)');
//       } else {
//         // Check status code (if available) and provide more specific error messages
//         response.text().then(text => {
//           console.error('Network response was not ok:', response.status, text);
//         });
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }

// function onClickedEstimatePrice() {
//   console.log("Estimate price button clicked");
//   const sqft = parseFloat(document.getElementById("uiSqft").value);
//   const bhk = getBHKValue();
//   const bathrooms = getBathValue();
//   const location = document.getElementById("uiLocations").value;

//   // Create the data object to be sent
//   const postData = {
//     total_sqft: sqft,
//     bhk: bhk,
//     bath: bathrooms,
//     location: location
//   };

//   // Send the POST request
//   fetch('http://127.0.0.1:5000/predict_home_price', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(postData)
//   })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log('Success:', data);
//       // Update the UI with the estimated price
//       const estPrice = document.getElementById("uiEstimatedPrice");
//       estPrice.innerHTML = data.estimated_price;
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }


// function cj() {
//   console.log("Estimate price button clicked");
//   let sqft = document.getElementById("uiSqft").value;
//   let bhk = getBHKValue();
//   let bathrooms = getBathValue();
//   let location = document.getElementById("uiLocations").value;
  
//   // Create the data object to be sent
//   let postData = {
//     total_sqft: parseFloat(sqft),
//     bhk: bhk,
//     bath: bathrooms,
//     location: location
//   };

//   // Use fetch API to send the POST request
//   fetch('http://127.0.0.1:5000/predict_home_price', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(postData)
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log('Success:', data);
//     let estPrice = document.getElementById("uiEstimatedPrice");
//     estPrice.innerHTML = data.estimated_price;
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });
// }
