const MessagingResponse = require('twilio').twiml.MessagingResponse;
const querystring = require('querystring');

const generateResponse = (input) => {
  const twiml = new MessagingResponse();
  twiml.message('Hello from the ' + process.env.DEPLOY_ENV + ' environment! You said "' + input.Body + '"');
  return twiml.toString();
};

module.exports.hello = async event => {
  return {
    statusCode: 200,
    headers: {'Content-Type': 'text/xml'},
    body: generateResponse(querystring.parse(event.body)),
  };
};
