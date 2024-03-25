import { travels } from "./tripData";

function drawTravel() {
  console.log(travels);
  const travelResult = document.querySelector(".main__results");
  let travelItems = "";
  travels.forEach((element, index) => {
    travelItems += `
            <div class="main__results--card">
                <div class="main__results--card--content">
                    <strong class="main__results--card--title">My Trip to: ${element.destinationName}</strong>
                    <div class="main__results--card--details">
                        <div class="main__results--card--detail">
                            <span>Date:</span>
                            <p>${element.tripDate}</p>
                        </div>
                        <div class="main__results--card--detail">
                            <span>Days Left:</span>
                            <p>${element.daysLeft}</p>
                        </div>
                        <div class="main__results--card--detail">
                            <span>Weather:</span>
                            <p>${element.temperature}</p>
                        </div>
                        <div class="main__results--card--detail">
                          <img src="${element.photo}" alt="Photo of selected destination" width="170" height="90">
                        </div>
                    </div>
                </div>
                <button id="remove" class="main__results--card--button" type="button" data-index="${index}">Remove Trip</button>
            </div>
      
          `;
  });

  // use innerHTML so that products only drawn once
  travelResult.innerHTML = travelItems;

  const removeButtons = document.querySelectorAll("#remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", handleRemove);
  });
}

function handleRemove(event) {
  const index = event.target.dataset.index;
  travels.splice(index, 1);
  drawTravel();
}

export { drawTravel };
