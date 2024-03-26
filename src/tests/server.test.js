import { mockImplementation } from "node-fetch";
import request from "supertest";
import app from "../server/server";

// Mocking style imports
jest.mock("../client/styles/main.scss", () => ({}));
jest.mock("../client/styles/header.scss", () => ({}));
jest.mock("../client/styles/footer.scss", () => ({}));

// Mocking the external APIs
jest.mock("node-fetch", () => jest.fn());

mockImplementation((url) => {
  if (url.includes("geonames")) {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          postalcodes: [{ lat: 40.7128, lng: -74.006 }],
        }),
    });
  } else if (url.includes("weatherbit")) {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          weather: {
            minutely: [
              { temp: 20 },
              {
                temp: 15.7,
              },
            ],
          },
        }),
    });
  } else if (url.includes("pixabay")) {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          photo: { hits: [{ largeImageURL: "mockedURL" }] },
        }),
    });
  }
});

describe("POST /fetchDestination", () => {
  it("responds with JSON containing geoNames, weather, and photo data", async () => {
    const cityName = "New York";
    const expectedResponse = {
      geoNames: {
        postalcodes: [
          {
            lng: -74.006,
            lat: 40.7128,
          },
        ],
      },
      weather: {
        weather: {
          minutely: [
            {
              temp: 20,
            },
            {
              temp: 15.7,
            },
          ],
        },
      },
      photo: {
        photo: {
          hits: [
            {
              largeImageURL: "mockedURL",
            },
          ],
        },
      },
    };

    const response = await request(app)
      .post("/fetchDestination")
      .send({ city: cityName });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });
});
