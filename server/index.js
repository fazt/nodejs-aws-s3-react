const express = require('express')
const fileUpload = require('express-fileupload')
const photosRoutes = require('./photos.routes')
const cors = require('cors')

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
}))

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './archivos'
}));

app.use(photosRoutes)

app.use(express.static('images'))

app.listen(3000)
console.log(`Server on port ${3000}`)