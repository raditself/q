<template>
  <div id="app">
    <h1>AI-Powered Ollama UI</h1>
    <div class="container">
      <ChatInterface />
      <CodeEditor />
      <Terminal />
    </div>
  </div>
</template>

<script>
import ChatInterface from './components/ChatInterface.vue';
import CodeEditor from './components/CodeEditor.vue';
import Terminal from './components/Terminal.vue';

export default {
  name: 'App',
  components: {
    ChatInterface,
    CodeEditor,
    Terminal,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  display: flex;
  justify-content: space-around;
  height: 80vh;
}

.container > * {
  flex-basis: 30%;
  border: 1px solid #ccc;
  padding: 10px;
  overflow: auto;
}
</style>
