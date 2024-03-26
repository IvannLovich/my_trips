import { handleSubmit } from "../client/js/formHandler";

describe("handleSubmit function", () => {
  beforeEach(() => {
    // Mocking DOM elements and values
    document.body.innerHTML = `
      <main></main>
      <input id="name" value="New York">
      <input id="departure" value="2024-04-01">
      <input id="arrival" value="2024-04-10">
      <div id="loader" class="hidden"></div>
    `;
  });

  it("should handle form submission and fetch destination data", async () => {
    // Mock fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            geoNames: {
              postalcodes: [{ placeName: "New York" }],
            },
            weather: { minutely: [{ temp: 20 }] },
            photo: { hits: [{ largeImageURL: "mockedURL" }] },
          }),
      })
    );

    // Trigger form submission
    await handleSubmit(new Event("submit"));

    // Expectations
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/fetchDestination",
      {
        method: "POST",
        body: JSON.stringify({ city: "New York" }),
        headers: { "Content-Type": "application/json" },
      }
    );
  });

  it("should display an alert if form data is invalid", async () => {
    // Mock invalid form data
    document.getElementById("name").value = "";
    document.getElementById("departure").value = "2023-03-01";

    // Spy on window.alert
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    // Trigger form submission
    await handleSubmit(new Event("submit"));

    // Expectations
    expect(alertSpy).toHaveBeenCalledWith("Please enter a valid data");

    // Restore alert function
    alertSpy.mockRestore();
  });
});
