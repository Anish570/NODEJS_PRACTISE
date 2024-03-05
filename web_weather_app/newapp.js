const http = require('http');
const fs = require('fs');
const axios = require('axios');
const url = require('url');

const server = http.createServer();
const weatherdetail = fs.readFileSync('./weather.html', 'utf-8');
const html = fs.readFileSync('./index.html', 'utf-8');

server.on('request', async (req, res) => {
  if (req.url === '/') {
    if (req.method === 'GET') {
      // Serve the initial HTML page
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } else if (req.method === 'POST') {
      // Handle form submission (user entered a location)
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', async () => {
        const parsedBody = new URLSearchParams(body);
        const location = parsedBody.get('location');

        try {
          // Replace this with your actual OpenWeatherMap API key
          const apiKey = '289927b9bcacfe87b6d593d2ecd8e8fd';
          const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

          const response = await axios.get(apiUrl);
          const weatherData = response.data;

          // Extract relevant data from the API response
          const temperature = weatherData.main.temp;
          const humidity = weatherData.main.humidity;
          const pressure = weatherData.main.pressure;
          const description = weatherData.weather[0].description;

          // Replace placeholders in the weather HTML with weather data
          const updatedWeatherDetail = weatherdetail
            .replace('{{TEMP}}', temperature)
            .replace('{{HUMIDITY}}', humidity)
            .replace('{{WIND}}', pressure)
            .replace('{{DESC}}', description);

          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(html.replace('{{%CONTENT%}}', updatedWeatherDetail));
        } catch (error) {
          console.error(error);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        }
      });
    }
  } else {
    // Handle other routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 8000;
const HOST = '127.0.0.1';

server.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
