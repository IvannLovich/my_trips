# Trips of Dreams

A nice app to save the trip that you are planning.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Description

In order you can use this webapp you have to type the city of your dreams, select the date you want to travel and date you have to return. And there you go. Your dream trip is set!!

## Installation

This app has been dockerized to avoid issues with incompatible Node.js versions across different environments, making it easier to set up and run regardless of your local Node setup.

### Docker Installation

To run this project, ensure Docker is installed on your system.

#### macOS

1. Download and install Docker Desktop for Mac from [Docker’s official website](https://www.docker.com/products/docker-desktop/).
2. After installation, start Docker Desktop and make sure it is running.

#### Windows

1. Download and install Docker Desktop for Windows from [Docker’s official website](https://www.docker.com/products/docker-desktop/).
2. Start Docker Desktop after installation, and ensure it is running before proceeding.

#### Linux

1. Update your package index:

   ```bash
   sudo apt update
   ```

2. Install Docker with the following commands:

   ```bash
   sudo apt install docker.io
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

3. To verify that Docker is installed correctly, run:

   ```bash
   docker --version
   ```

After installing Docker, you're ready to set up the project.

## Environment Variables

This project relies on environment variables for accessing external APIs. Once you have downloaded the project, you must modify the .env file with your own API keys, as the ones included by default may have expired or may not be valid.

#### .env File

```bash
GEONAMES_API_USERNAME=your_geonames_username
WEATHER_API_KEY=your_weather_api_key
PHOTO_API_KEY=your_photo_api_key

```

Ensure you replace the placeholder values (`your_geonames_username`, `your_weather_api_key`, `your_photo_api_key`) with your own valid API keys.

## Project Setup

1. Clone the repository to your local machine using `git clone`.

   ```bash
   git clone https://github.com/IvannLovich/my_trips
   ```

2. Navigate to the project directory.

```bash
cd myproject
```

3. Start the project with Docker Compose:

```bash
docker-compose up --build
```

This will start the server and make your project available at http://localhost:3000.

## Usage

You have to write city destination you want to go and set a departure date as well a return date

## Tests

This project includes tests to ensure its functionality.

#### Running the Tests

To run all the tests, execute the following command:

```bash
npm run test
```

#### Test Files

The tests for this project are organized into the following files:

1. formHandler.test.js: This file contains tests related to the form handling functionality.
2. front.test.js: This file includes tests for the front-end components.
3. helpers.test.js: Here you can find tests for helper functions used in the project.
4. server.test.js: Here you will see a test for a successful request.

To run tests for a specific file, you can use the following command:

```bash
npm run test <filename>
```

Replace <filename> with the name of the specific test file you want to run.

## Contributing

If you would like to contribute to the project, please follow these steps:

Fork the repository.

1. Create a new branch (git checkout -b feature/improvement).
2. Make your changes.
3. Commit your changes (git commit -am 'Add new feature').
4. Push to the branch (git push origin feature/improvement).
5. Create a new Pull Request.

## License

This project is licensed under the ISC License.
