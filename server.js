const http = require('http')
const app = require('./app')
const server = http.createServer(app)
const port = process.env.Port || 3000
server.listen(port, '127.0.0.1', () => {
    console.log('server is running')
})

