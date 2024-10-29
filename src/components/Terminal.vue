<template>
  <div class="terminal">
    <div class="terminal-output">
      <pre>{{ output }}</pre>
    </div>
    <div class="terminal-input">
      <input v-model="command" @keyup.enter="executeCommand" placeholder="Enter command...">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Terminal',
  data() {
    return {
      output: 'Welcome to the terminal.\n',
      command: '',
    };
  },
  methods: {
    executeCommand() {
      if (this.command.trim() === '') return;

      this.output += '$ ' + this.command + '\n';
      // In a real application, you would send the command to a backend for execution
      // For now, we'll just echo the command
      this.output += 'Command executed: ' + this.command + '\n';
      this.command = '';
    },
  },
};
</script>

<style scoped>
.terminal {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #000;
  color: #0f0;
  font-family: monospace;
}

.terminal-output {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
}

.terminal-input {
  display: flex;
  padding: 10px;
}

.terminal-input input {
  flex-grow: 1;
  background-color: #000;
  color: #0f0;
  border: none;
  font-family: monospace;
}
</style>
