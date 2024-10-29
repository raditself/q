<template>
  <div class="chat-interface">
    <div class="chat-messages">
      <div v-for="(message, index) in messages" :key="index" :class="message.type">
        {{ message.content }}
      </div>
    </div>
    <div class="chat-input">
      <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Type your message...">
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ChatInterface',
  data() {
    return {
      messages: [],
      userInput: '',
    };
  },
  methods: {
    async sendMessage() {
      if (this.userInput.trim() === '') return;

      this.messages.push({ type: 'user', content: this.userInput });
      const userMessage = this.userInput;
      this.userInput = '';

      try {
        const response = await axios.post('http://localhost:11434/api/generate', {
          model: 'llama2',
          prompt: userMessage,
        });
        this.messages.push({ type: 'ai', content: response.data.response });
      } catch (error) {
        console.error('Error:', error);
        this.messages.push({ type: 'error', content: 'An error occurred while processing your request.' });
      }
    },
  },
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
}

.chat-input {
  display: flex;
  padding: 10px;
}

.chat-input input {
  flex-grow: 1;
  margin-right: 10px;
}

.user {
  text-align: right;
  color: blue;
}

.ai {
  text-align: left;
  color: green;
}

.error {
  color: red;
}
</style>
