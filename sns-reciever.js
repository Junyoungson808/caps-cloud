exports.handler = async (event) => {
  // these 2 lines log our message
  let message = event.Records[0].Sns.Message;
  console.log('NOISE --- NOTICE ME SENPAI', message);

  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify(message),
  };
  return response;
};