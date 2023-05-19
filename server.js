const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


// Handle the /summary command
app.post('/summary', async (req, res) => {
  // Extract necessary information from the request payload
  const { channel_id } = req.body;
  
 console.log(`channel id ${channel_id}`);
//  console.log(`key ${process.env.YOUR_SLACK_ACCESS_TOKEN}`);


  try {
    // Use the Slack API to retrieve chat history
    const response = await axios.get('https://slack.com/api/conversations.history', {
      params: {
        'token': `${ process.env.YOUR_SLACK_ACCESS_USER_TOKEN }`,
        'channel': `${ channel_id }`, // Replace with the appropriate channel ID
      },
    });

    // Process the chat history and generate a summary
    // const summary = generateSummary(response.data.messages);
    const msg = response.data;
    console.log(msg)

    // Use the Slack API to send the summary back to the user
    await axios.post('https://slack.com/api/chat.postMessage', {
      'token': `${ process.env.YOUR_SLACK_ACCESS_BOT_TOKEN }`,
      'channel': `${ channel_id }`,
      'text': 'I am Jiashen Zhang',
    });

    res.sendStatus(200);
  } catch (error) {
    console.error('Error:', error);
    res.sendStatus(500);
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
