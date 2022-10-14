'use strict';

const AWS = require('aws-sdk');
const { Consumer } = require('sqs-consumer');

AWS.config.update({ region: 'us-west-2' });

const message = process.argv[2];

const sns = new AWS.SNS();

const topic = 'arn:aws:lambda:us-west-2:822448088818:function:jgs-sns-receiver'; // MINE JGS

const payload = {
  Message: message,
  TopicArn: topic,
};

sns.publish(payload).promise()
  .then(data => console.log(data))
  .catch(err => console.log(err));

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/822448088818/jgs-sqs-delivery-confirmation.fifo', //RYANS
  handleMessage: (data) => {
    let body = JSON.parse(data.Body);
    console.log('message Received: ', body);
  },
});

app.start();