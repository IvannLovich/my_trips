function dayLeftToTrip(travelDate, actualDate) {
  // One day in milliseconds
  const oneDay = 24 * 60 * 60 * 1000;

  // Set hours, minutes, seconds, and milliseconds to 0 for accurate calculation
  travelDate.setHours(0, 0, 0, 0);
  actualDate.setHours(0, 0, 0, 0);

  // Calculate the difference in days
  const timeDiff = Math.abs(travelDate.getTime() - actualDate.getTime());

  // Absolute difference
  const daysLeft = Math.ceil(timeDiff / oneDay) + 1; // Add 1 to include the day of the trip

  return daysLeft;
}

export { dayLeftToTrip };
