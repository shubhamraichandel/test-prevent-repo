const { Webhooks, createNodeMiddleware } = require("@octokit/webhooks");
const EventSource = require('eventsource');

const webhooks = new Webhooks({
  secret: "abcd1234",
});



webhooks.on(("repository.created"),({ id, name, payload }) => {
  console.log("payload->>>>> : ", payload);
});

require("http").createServer(createNodeMiddleware(webhooks)).listen(3000);


const webhookProxyUrl = "https://smee.io/1SB9qk8C9zfYsQe3";
const source = new EventSource(webhookProxyUrl);

source.onmessage = (event) => {
  const webhookEvent = JSON.parse(event.data);
  webhooks
    .verifyAndReceive({
      id: webhookEvent["x-request-id"],
      name: webhookEvent["x-github-event"],
      signature: webhookEvent["x-hub-signature"],
      payload: webhookEvent.body,
    })
    .catch(console.error);
}; 



