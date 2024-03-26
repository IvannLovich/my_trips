import { dayLeftToTrip } from "../client/js/helpers";

describe("dayLeftToTrip function", () => {
  it("should calculate days left correctly", () => {
    const travelDate = new Date("2024-04-01");
    const actualDate = new Date("2024-03-25");

    const daysLeft = dayLeftToTrip(travelDate, actualDate);

    expect(daysLeft).toBe(8);
  });
});
