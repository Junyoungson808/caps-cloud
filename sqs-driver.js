'use strict';

const { Consumer } = require('sqs-consumer');
const { Producer } = require('sqs-producer');

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/822448088818/packages-sqs.fifo',
  handleMessage: async (data) => {
    let originalMessageBody = JSON.parse(data.Body);
    let order = JSON.parse(originalMessageBody.Message);
    console.log(order);

    const producer = Producer.create({
      queueUrl: order.vendorId,
      region: 'us-west-2',
    });

    let messageString = JSON.stringify(`order delivered for: ${order.customer}`);

    let payload = {
      id: order.orderId,
      body: messageString,
    };

    let response = await producer.send(payload);
    console.log(response);

  },
});

app.start();
