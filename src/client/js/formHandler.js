import uniqid from "uniqid";
import { dayLeftToTrip } from "./helpers";
import { travels } from "./tripData";

async function handleSubmit(event) {
  event.preventDefault();

  const content = document.querySelector("main");
  const loader = document.getElementById("loader");

  const date = new Date();

  const city = document.getElementById("name").value;
  const travelDateFrom = document.getElementById("departure").value;
  const travelDateTo = document.getElementById("arrival").value;
  const travelDateDepartureParsed = new Date(travelDateFrom);
  const travelArribalParsed = new Date(travelDateTo);

  if (
    ((travelDateDepartureParsed > date &&
      travelDateDepartureParsed < travelArribalParsed) ||
      (travelDateDepartureParsed.getFullYear() === date.getFullYear() &&
        travelDateDepartureParsed.getMonth() === date.getMonth() &&
        travelDateDepartureParsed.getDate() + 1 === date.getDate() &&
        travelDateDepartureParsed < travelArribalParsed)) &&
    city !== undefined &&
    city.trim() !== ""
  ) {
    const leftForTravel = dayLeftToTrip(travelDateDepartureParsed, date);
    console.log(leftForTravel);
    content.style.opacity = 0.5;
    loader.classList.remove("hidden");
    try {
      const response = await fetch("http://localhost:3000/fetchDestination", {
        method: "POST",
        body: JSON.stringify({ city }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      content.style.opacity = 1;
      loader.classList.add("hidden");

      travels.push({
        id: uniqid(),
        destinationName: data.geoNames.postalcodes[1].placeName,
        tripDate: travelDateFrom,
        daysLeft: leftForTravel,
        temperature: data.weather.minutely[0].temp,
        photo: data.photo.hits[0].largeImageURL,
      });

      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  } else {
    alert("Please enter a valid data");
  }
}

export { handleSubmit };
