const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-2'});

const sqs = new AWS.SQS({apiVersion: '2012-11-05'});


var params = {
    DelaySeconds: 1,
    MessageAttributes: {
     "Title": {
       DataType: "String",
       StringValue: "New Job!"
      },
     "Author": {
       DataType: "String",
       StringValue: "John Grisham"
      },
     "WeeksOn": {
       DataType: "Number",
       StringValue: "6"
      }
    },
    MessageBody: "There's a new job for Zane! Lawnmowing!",
    QueueUrl: "https://sqs.us-east-2.amazonaws.com/890359546778/zane-job-notification"
   };
   
   sqs.sendMessage(params, function(err, data) {
     if (err) {
       console.log("Error", err);
     } else {
       console.log("Success", data.MessageId);
     }
   });

