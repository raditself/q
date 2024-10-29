
<template>
  <div class="chat-interface">
    <div class="chat-messages" ref="chatMessages">
      <div v-for="(message, index) in messages" :key="index" :class="message.type">
        <strong>{{ message.type === 'user' ? 'You: ' : 'AI: ' }}</strong>
        <pre v-if="message.type === 'ai' && message.isCode">{{ message.content }}</pre>
        <span v-else v-html="message.content"></span>
      </div>
    </div>
    <div class="chat-input">
      <textarea v-model="userInput" @keyup.enter.exact="sendMessage" @keyup.shift.enter="newLine" placeholder="Type your message... (Shift+Enter for new line)"></textarea>
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onUpdated } from 'vue';

export default {
  name: 'ChatInterface',
  setup() {
    const messages = ref([]);
    const userInput = ref('');
    const chatMessages = ref(null);

    const sendMessage = async () => {
      if (userInput.value.trim() === '') return;

      const userMessage = userInput.value;
      messages.value.push({ type: 'user', content: userMessage });
      userInput.value = '';

      try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: "gpt-3.5-turbo",
          messages: [
            {"role": "system", "content": "You are a helpful AI assistant with knowledge of programming, GitHub, and various other topics."},
            {"role": "user", "content": userMessage}
          ]
        }, {
          headers: {
            'Authorization': `Bearer ${process.env.VUE_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        });

        const aiResponse = response.data.choices[0].message.content;
        const isCode = aiResponse.includes('```');

        messages.value.push({
          type: 'ai',
          content: isCode ? aiResponse.replace(/```\w*\n?/g, '') : aiResponse,
          isCode: isCode
        });
      } catch (error) {
        console.error('Error:', error);
        messages.value.push({ type: 'error', content: 'An error occurred while processing your request.' });
      }
    };

    const newLine = () => {
      userInput.value += '\n';
    };

    onUpdated(() => {
      if (chatMessages.value) {
        chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
      }
    });

    return {
      messages,
      userInput,
      sendMessage,
      newLine,
      chatMessages
    };
  }
};
</script>

<style scoped>
.chat-interface {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.chat-input {
  display: flex;
  padding: 10px;
}

.chat-input textarea {
  flex-grow: 1;
  margin-right: 10px;
  resize: vertical;
}

.user, .ai, .error {
  margin-bottom: 10px;
  max-width: 80%;
  padding: 8px;
  border-radius: 8px;
}

.user {
  align-self: flex-end;
  background-color: #DCF8C6;
}

.ai {
  align-self: flex-start;
  background-color: #E8E8E8;
}

.error {
  align-self: flex-start;
  background-color: #FFCCCB;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
}
</style>
