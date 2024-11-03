import { handleSubmit } from '../client/js/formHandler';

describe('handleSubmit function', () => {
  beforeEach(() => {
    // Mocking DOM elements and values
    document.body.innerHTML = `
      <main></main>
      <input id="name" value="New York">
      <input id="departure" value="2024-04-01">
      <input id="arrival" value="2024-04-10">
      <div id="loader" class="hidden"></div>
    `;
    global.alert = jest.fn(); // Mock alert
  });

  it('should handle form submission and fetch destination data', async () => {
    // Mock fetch function with a successful response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            geoNames: {
              postalcodes: [{ placeName: 'New York' }],
            },
            weather: { minutely: [{ temp: 20 }] },
            photo: { hits: [{ largeImageURL: 'mockedURL' }] },
          }),
      })
    );

    // Trigger form submission
    await handleSubmit(new Event('submit'));
  });

  it('should handle an error response gracefully', async () => {
    // Mock fetch function to simulate an error
    global.fetch = jest.fn(() => Promise.reject(new Error('Fetch failed')));

    // Trigger form submission
    await handleSubmit(new Event('submit'));

    // Expect alert to be called with an error message
    expect(global.alert).toHaveBeenCalledWith('Please enter a valid data');
  });

  it('should display an alert if form data is invalid', async () => {
    // Mock invalid form data
    document.getElementById('name').value = '';
    document.getElementById('departure').value = '2023-03-01';

    // Trigger form submission
    await handleSubmit(new Event('submit'));

    // Expectations
    expect(global.alert).toHaveBeenCalledWith('Please enter a valid data');
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore all mocks after each test
  });
});
