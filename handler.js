const MessagingResponse = require('twilio').twiml.MessagingResponse;
const querystring = require('querystring');
const fetch = require("node-fetch");

const url = "https://some-random-api.ml/chatbot?message=";

const getData = async (url, query) => {
  try {
    const response = await fetch(url + query);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};

const generateResponse = async (input) => {
  const twiml = new MessagingResponse();
  const chatResponse = await getData(url, input.Body);
  twiml.message(chatResponse.response);
  return twiml.toString();
};

module.exports.chat = async event => {
  const response = await generateResponse(querystring.parse(event.body))
  return {
    statusCode: 200,
    headers: {'Content-Type': 'text/xml'},
    body: response,
  };
};
