const dotenv = require('dotenv');
dotenv.config();

const app = require('./app.js')
const http = require('http')
const server =  http.createServer(app)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));