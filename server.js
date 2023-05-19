const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


// Handle the /summary command
app.post('/summary', async (req, res) => {
  // Extract necessary information from the request payload
  const { text, user_id } = req.body;

  try {
    // Use the Slack API to retrieve chat history
    const response = await axios.get('https://slack.com/api/conversations.history', {
      params: {
        token: '${{ secrets.YOUR_SLACK_ACCESS_TOKEN }}',
        channel: 'summary-ai-test', // Replace with the appropriate channel ID
      },
    });

    // Process the chat history and generate a summary
    // const summary = generateSummary(response.data.messages);
    const summary = response.data.messages;
    console.log(`${summary}`)

    // Use the Slack API to send the summary back to the user
    await axios.post('https://slack.com/api/chat.postMessage', {
      token: '${{ secrets.YOUR_SLACK_ACCESS_TOKEN }}',
      channel: user_id,
      text: summary,
    });

    res.sendStatus(200);
  } catch (error) {
    console.error('Error:', error);
    res.sendStatus(500);
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
