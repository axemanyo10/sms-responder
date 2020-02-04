const MessagingResponse = require('twilio').twiml.MessagingResponse;
const querystring = require('querystring');

const generateResponse = (input) => {
  const twiml = new MessagingResponse();
  if(input.Body == "Hello") {
    twiml.message('Well Done');
  } else {
    twiml.message('Bad');
  }
  return twiml.toString();
};

module.exports.hello = async event => {
  console.log(event.body);
  console.log(querystring.parse(event.body));
  return {
    statusCode: 200,
    headers: {'Content-Type': 'text/xml'},
    body: generateResponse(querystring.parse(event.body)),
  };
};
