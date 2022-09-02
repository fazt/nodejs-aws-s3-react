require('dotenv').config()
const {S3Client, PutObjectCommand, GetObjectCommand} = require('@aws-sdk/client-s3')
const fs = require('fs')

const AWS_PUBLIC_KEY=process.env.AWS_PUBLIC_KEY
const AWS_SECRET_KEY=process.env.AWS_SECRET_KEY
const AWS_BUCKET_NAME=process.env.AWS_BUCKET_NAME
const AWS_BUCKET_REGION=process.env.AWS_BUCKET_REGION

const client = new S3Client({ region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    }
});

async function uploadFile(file) {
    const stream = fs.createReadStream(file.tempFilePath);
    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: file.name,
        Body: stream
      };
    const command = new PutObjectCommand(uploadParams)
    return await client.send(command)
}

async function readFile(fileName) {
    const command = new GetObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: fileName
    })

    const result = await client.send(command)
    // const newFile = fs.createWriteStream('./images/newimage.png')
    result.Body.pipe(fs.createWriteStream('./images/newimage.png'))
}

module.exports = {
    uploadFile,
    readFile
}

