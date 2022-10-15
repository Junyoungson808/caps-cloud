'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
const { Consumer } = require('sqs-consumer');
const Chance = require('chance');
const chance = new Chance();

const sns = new AWS.SNS(); //creates instance
const topic = 'arn:aws:sns:us-west-2:822448088818:pickup-sns.fifo';
const queueUrl = 'https://sqs.us-west-2.amazonaws.com/822448088818/sqs-vendor2';

setInterval(() => {
  let orderDetails = {
    orderId: chance.guid(),
    customer: chance.name(),
    vendorId: queueUrl,
  };

  let messageString = JSON.stringify(orderDetails);

  const payload = {
    Message: messageString,
    TopicArn: topic,
    MessageGroupId: 'vendor2',
    MessageDeduplicationId: chance.guid(),
  };

  sns.publish(payload).promise()
    .then(data => console.log(data))
    .catch(err => console.log(err));
}, 6000);

const app = Consumer.create({
  queueUrl: queueUrl,
  handleMessage: async (data) => {
    let body = JSON.parse(data.Body);
    console.log(body);
  },
});