import { drawTravel } from "../client/js/front";
import { travels } from "../client/js/tripData";

describe("drawTravel function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should correctly draw travel cards", () => {
    // Mocking DOM elements
    document.body.innerHTML = `
      <div class="main__results"></div>
    `;

    // Mocking travel data
    travels.push({
      destinationName: "New York",
      tripDate: "2024-04-01",
      daysLeft: 6,
      temperature: 20,
      photo: "mockedURL",
    });

    drawTravel();

    // Ensure the travel cards are drawn correctly
    expect(document.querySelector(".main__results").innerHTML).toContain(
      "My Trip to: New York"
    );
  });
});
