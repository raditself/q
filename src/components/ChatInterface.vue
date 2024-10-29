
<template>
  <div class="chat-interface">
    <div class="chat-messages" ref="chatMessages">
      <div v-for="(message, index) in messages" :key="index" :class="message.type">
        <strong>{{ message.type === 'user' ? 'You: ' : 'AI: ' }}</strong>
        <pre v-if="message.type === 'ai' && message.isCode">{{ message.content }}</pre>
        <span v-else v-html="message.content"></span>
      </div>
      <div v-if="isLoading" class="loading-message">AI is thinking...</div>
    </div>
    <div class="chat-input">
      <textarea v-model="userInput" @keyup.enter.exact="sendMessage" @keyup.shift.enter="newLine" placeholder="Type your message... (Shift+Enter for new line)" :disabled="isLoading"></textarea>
      <button @click="sendMessage" :disabled="isLoading">Send</button>
    </div>
    <div class="personality-slider">
      <label for="personality">AI Personality: {{ personalityLabel }}</label>
      <input type="range" id="personality" v-model="personality" min="0" max="1" step="0.1">
    </div>
    <div class="expertise-selector">
      <label for="expertise">Expertise Level: {{ expertiseLevelLabel }}</label>
      <select id="expertise" v-model="expertiseLevel">
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="expert">Expert</option>
      </select>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onUpdated, computed } from 'vue';
import { getJson } from 'google-search-results-nodejs';

export default {
  name: 'ChatInterface',
  setup() {
    const messages = ref([]);
    const conversationHistory = ref([]);
    const userInput = ref('');
    const chatMessages = ref(null);
    const personality = ref(0.5);
    const expertiseLevel = ref('intermediate');
    const contextWindowSize = 10; // Number of recent messages to keep for context
    const isLoading = ref(false);

    const personalityLabel = computed(() => {
      if (personality.value < 0.4) return 'Concise';
      if (personality.value > 0.6) return 'Detailed';
      return 'Balanced';
    });

    const expertiseLevelLabel = computed(() => {
      switch(expertiseLevel.value) {
        case 'beginner': return 'Beginner';
        case 'intermediate': return 'Intermediate';
        case 'expert': return 'Expert';
        default: return 'Intermediate';
      }
    });

    const performWebSearch = async (query) => {
      const params = {
        engine: "google",
        q: query,
        api_key: process.env.VUE_APP_SERPAPI_KEY
      };

      try {
        const results = await new Promise((resolve, reject) => {
          getJson(params, (data) => {
            if (data.organic_results && data.organic_results.length > 0) {
              resolve(data.organic_results.slice(0, 3));
            } else {
              reject(new Error('No results found'));
            }
          });
        });

        return results.map(result => `${result.title}: ${result.snippet}`).join('\n');
      } catch (error) {
        console.error('Web search error:', error);
        return 'Unable to perform web search at this time.';
      }
    };

    const knowledgeBase = {
      "AI": "Artificial Intelligence is the simulation of human intelligence processes by machines, especially computer systems.",
      "Machine Learning": "Machine Learning is a subset of AI that provides systems the ability to automatically learn and improve from experience without being explicitly programmed.",
      "Neural Networks": "Neural Networks are computing systems vaguely inspired by the biological neural networks that constitute animal brains.",
      "Deep Learning": "Deep Learning is a subset of machine learning that uses multi-layered neural networks to learn from vast amounts of data.",
      "Natural Language Processing": "NLP is a branch of AI that focuses on the interaction between computers and humans using natural language.",
      "Computer Vision": "Computer Vision is an interdisciplinary field that deals with how computers can gain high-level understanding from digital images or videos.",
      "Robotics": "Robotics is a branch of engineering that involves the conception, design, manufacture, and operation of robots.",
      "Expert Systems": "Expert Systems are AI programs that emulate the decision-making ability of a human expert in a specific domain.",
    };

    const retrieveKnowledge = (query) => {
      const relevantInfo = Object.entries(knowledgeBase)
        .filter(([key, value]) => query.toLowerCase().includes(key.toLowerCase()))
        .map(([key, value]) => `${key}: ${value}`)
        .join(" ");
      return relevantInfo ? `Relevant information: ${relevantInfo}` : "";
    };

    const fewShotExamples = [
      {"role": "user", "content": "What is AI?"},
      {"role": "assistant", "content": "AI, or Artificial Intelligence, refers to the development of computer systems that can perform tasks that typically require human intelligence. These tasks include visual perception, speech recognition, decision-making, and language translation. AI systems are designed to analyze their environment and take actions that maximize their chance of success at a given goal."},
      {"role": "user", "content": "Can you explain machine learning?"},
      {"role": "assistant", "content": "Machine Learning is a subset of AI that focuses on the development of algorithms and statistical models that enable computer systems to improve their performance on a specific task through experience. Instead of explicitly programming rules, machine learning allows a system to learn patterns from data and make predictions or decisions without being explicitly programmed to perform the task."},
      {"role": "user", "content": "What's the difference between deep learning and neural networks?"},
      {"role": "assistant", "content": "While both deep learning and neural networks are related concepts in AI, there is a distinction. Neural networks are a type of machine learning model inspired by the structure of biological brains, consisting of interconnected nodes or 'neurons'. Deep learning, on the other hand, refers specifically to neural networks with multiple layers (hence 'deep'). Deep learning models can automatically learn hierarchical features from data, making them particularly powerful for tasks like image and speech recognition. So, while all deep learning models use neural networks, not all neural networks are deep learning models."},
      {"role": "user", "content": "How is NLP used in AI?"},
      {"role": "assistant", "content": "Natural Language Processing (NLP) is a crucial component of AI that focuses on the interaction between computers and human language. It's used in various applications such as:

1. Machine Translation: Automatically translating text or speech from one language to another.
2. Sentiment Analysis: Determining the emotional tone behind a series of words, used to gain an understanding of attitudes, opinions and emotions expressed within online mentions.
3. Chatbots and Virtual Assistants: Enabling machines to understand and respond to human queries in a natural way.
4. Text Summarization: Automatically generating concise summaries of longer texts.
5. Speech Recognition: Converting spoken language into written text.
6. Information Extraction: Automatically extracting structured information from unstructured or semi-structured documents.

NLP combines rule-based modeling of human language with statistical, machine learning, and deep learning models. This allows computers to process human language in the form of text or voice data and 'understand' its full meaning, complete with the speaker or writer's intent and sentiment."},
    ];

    const sendMessage = async () => {
      if (userInput.value.trim() === '' || isLoading.value) return;

      isLoading.value = true;
      const userMessage = userInput.value;
      messages.value.push({ type: 'user', content: userMessage });
      conversationHistory.value.push({ role: 'user', content: userMessage });
      userInput.value = '';

      const personalityInstruction = personality.value < 0.4 ? 
        "Provide concise and brief responses." : 
        personality.value > 0.6 ? 
        "Provide detailed and comprehensive responses." : 
        "Provide balanced responses with moderate detail.";

      const expertiseInstruction = 
        expertiseLevel.value === 'beginner' ? "Explain concepts in simple terms, avoiding jargon." :
        expertiseLevel.value === 'expert' ? "You can use technical terms and go into depth." :
        "Use a mix of simple explanations and some technical terms.";

      const relevantInfo = retrieveKnowledge(userMessage);

      // Perform web search if knowledge base doesn't have relevant information
      let webSearchResults = '';
      if (!relevantInfo) {
        messages.value.push({ type: 'system', content: 'Performing web search...' });
        webSearchResults = await performWebSearch(userMessage);
        messages.value.pop(); // Remove the "Performing web search..." message
      }

      // Limit conversation history to the most recent messages
      const limitedHistory = conversationHistory.value.slice(-contextWindowSize);

      try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: "gpt-4",
          messages: [
            {"role": "system", "content": `You are a highly capable AI assistant with a vast knowledge base covering a wide range of topics. Your responses should be informative, engaging, and nuanced. Always strive to provide accurate information, and when appropriate, offer multiple perspectives on complex issues. If you're unsure about something, admit it and suggest ways to find more information. Engage in thoughtful analysis and be prepared to break down complex topics into understandable parts. Always maintain high ethical standards in your responses. ${personalityInstruction} ${expertiseInstruction}`},
            ...fewShotExamples,
            ...limitedHistory,
            {"role": "system", "content": relevantInfo || webSearchResults}
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
      } finally {
        isLoading.value = false;
      }
    };

    const newLine = () => {
      userInput.value += '
';
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
      personalityLabel,
      expertiseLevel,
      expertiseLevelLabel,
      isLoading
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

.expertise-selector {
  margin-top: 10px;
}

.expertise-selector select {
  margin-left: 10px;
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

.user, .ai, .error, .system {
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 5px;
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
  align-self: center;
  background-color: #FFCCCB;
}

.system {
  align-self: center;
  background-color: #F0F0F0;
  font-style: italic;
}

.loading-message {
  align-self: center;
  font-style: italic;
  color: #888;
}
</style>
