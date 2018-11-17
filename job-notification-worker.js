const AWS = require('aws-sdk');

AWS.config.update({region: "us-east-2"});

const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

const queueURL = "https://sqs.us-east-2.amazonaws.com/890359546778/zane-job-notification";

const params = {
    AttributeNames: [
        "SentTimestamp"
    ],
    MaxNumberOfMessages: 1,
    MessageAttributeNames: [
        "All"
    ],
    QueueUrl : queueURL,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 0
};

sqs.receiveMessage(params, (err, data)=> {
    if(err){
        console.log("Receive Error", err);
    } else if(data.Messages) {
        let deleteParams = {
            QueueUrl: queueURL,
            ReceiptHandle: data.Messages[0].ReceiptHandle
        };
        sqs.deleteMessage(deleteParams, (err, data) =>{
            if(err) {
                console.log("Delete Error", err);
            } else {
                console.log("Message Deleted", data);
            }
        })
    }
})