const AWS = require("aws-sdk");
require('dotenv').config();

export const s3 = new AWS.S3({
    accessKeyId: 'AKIASIHKX5G6R7IFTFBY',
    secretAccessKey: process.env.S3_SECRET,
});

const params = {
    Bucket: 'stonksprofilespics',
    Key: 'ProfilePics/Default_pfp.svg.png',
};

export const DefaultPicUrl = s3.getSignedUrl('getObject', params);

