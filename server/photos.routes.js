const { Router } = require('express')
const {uploadFile, readFile} = require('./s3')

const router = Router()

router.get('/', (req, res) => res.send('welcome to server'))

router.post('/upload', async(req, res) => {

    console.log(req.files['photo'])
    const result = await uploadFile(req.files['photo'])
    console.log(result)

    res.send('archivo subido')
})

router.get('/archivo/:fileName', async (req, res) => {
    try {
        const result = await readFile(req.params.fileName)

        res.send('archivo descargado')
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = router