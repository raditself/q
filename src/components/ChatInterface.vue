
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
    <div class="personality-slider">
      <label for="personality">AI Personality: {{ personalityLabel }}</label>
      <input type="range" id="personality" v-model="personality" min="0" max="1" step="0.1">
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onUpdated, computed } from 'vue';

export default {
  name: 'ChatInterface',
  setup() {
    const messages = ref([]);
    const conversationHistory = ref([]);
    const userInput = ref('');
    const chatMessages = ref(null);
    const personality = ref(0.5);

    const personalityLabel = computed(() => {
      if (personality.value < 0.4) return 'Concise';
      if (personality.value > 0.6) return 'Detailed';
      return 'Balanced';
    });

    const knowledgeBase = {
      "AI": "Artificial Intelligence is the simulation of human intelligence processes by machines, especially computer systems.",
      "Machine Learning": "Machine Learning is a subset of AI that provides systems the ability to automatically learn and improve from experience without being explicitly programmed.",
      "Neural Networks": "Neural Networks are computing systems vaguely inspired by the biological neural networks that constitute animal brains.",
    };

    const retrieveKnowledge = (query) => {
      const relevantInfo = Object.entries(knowledgeBase)
        .filter(([key, value]) => query.toLowerCase().includes(key.toLowerCase()))
        .map(([key, value]) => value)
        .join(" ");
      return relevantInfo ? `Relevant information: ${relevantInfo}` : "";
    };

    const fewShotExamples = [
      {"role": "user", "content": "What is AI?"},
      {"role": "assistant", "content": "AI, or Artificial Intelligence, refers to the development of computer systems that can perform tasks that typically require human intelligence. These tasks include visual perception, speech recognition, decision-making, and language translation. AI systems are designed to analyze their environment and take actions that maximize their chance of success at a given goal."},
      {"role": "user", "content": "Can you explain machine learning?"},
      {"role": "assistant", "content": "Machine Learning is a subset of AI that focuses on the development of algorithms and statistical models that enable computer systems to improve their performance on a specific task through experience. Instead of explicitly programming rules, machine learning allows a system to learn patterns from data and make predictions or decisions without being explicitly programmed to perform the task."},
    ];

    const sendMessage = async () => {
      if (userInput.value.trim() === '') return;

      const userMessage = userInput.value;
      messages.value.push({ type: 'user', content: userMessage });
      conversationHistory.value.push({ role: 'user', content: userMessage });
      userInput.value = '';

      const personalityInstruction = personality.value < 0.4 ? 
        "Provide concise and brief responses." : 
        personality.value > 0.6 ? 
        "Provide detailed and comprehensive responses." : 
        "Provide balanced responses with moderate detail.";

      const relevantInfo = retrieveKnowledge(userMessage);

      try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: "gpt-4",
          messages: [
            {"role": "system", "content": `You are a highly capable AI assistant with a vast knowledge base covering a wide range of topics. Your responses should be informative, engaging, and nuanced. Always strive to provide accurate information, and when appropriate, offer multiple perspectives on complex issues. If you're unsure about something, admit it and suggest ways to find more information. Engage in thoughtful analysis and be prepared to break down complex topics into understandable parts. Always maintain high ethical standards in your responses. ${personalityInstruction}`},
            ...fewShotExamples,
            ...conversationHistory.value,
            {"role": "system", "content": relevantInfo}
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
          content: isCode ? aiResponse.replace(/```\w*
?/g, '') : aiResponse,
          isCode: isCode
        });

        conversationHistory.value.push({ role: 'assistant', content: aiResponse });
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
      chatMessages,
      personality,
      personalityLabel
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
