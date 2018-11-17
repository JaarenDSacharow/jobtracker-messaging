const Consumer = require('sqs-consumer');

const app = Consumer.create({
  queueUrl: 'https://sqs.us-east-2.amazonaws.com/890359546778/zane-job-notification',
  handleMessage: (message, done) => {
    // do some work with `message`
    console.log(message);
    done();
  }
});

app.on('error', (err) => {
  console.log(err.message);
});

app.start();