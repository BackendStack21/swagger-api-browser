const files = require('serve-static')
const path = require('path')

// serving "swagger-ui" as root directory
const serve = files(path.join(__dirname, 'swagger-ui'))

const app = require('restana')()

app.use((req, res, next) => {
  if (req.path === '/') {
    req.path = '/index.html'
  }

  return next()
})

app.use(serve)

app.get('/health', (req, res) => {
  res.send({
    status: 'OK'
  })
})

const PORT = process.env.PORT || 3000
app.start(PORT).then(() => {
  console.log(`Swagger Documentation catalog is available at http://0.0.0.0:${PORT}`)
})

