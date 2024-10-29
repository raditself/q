<template>
  <div class="code-editor">
    <div ref="editor"></div>
    <button @click="executeCode">Execute</button>
    <pre>{{ output }}</pre>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';

export default {
  name: 'CodeEditor',
  setup() {
    const editor = ref(null);
    const output = ref('');
    let view;

    onMounted(() => {
      const state = EditorState.create({
        doc: '// Your code here',
        extensions: [basicSetup, javascript()]
      });

      view = new EditorView({
        state,
        parent: editor.value
      });
    });

    const executeCode = () => {
      const code = view.state.doc.toString();
      // In a real application, you would send the code to a backend for execution
      // For now, we'll just display the code as output
      output.value = `Executing code:\n${code}`;
    };

    return {
      editor,
      output,
      executeCode
    };
  }
};
</script>

<style scoped>
.code-editor {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.code-editor > div {
  flex-grow: 1;
  overflow: auto;
}

button {
  align-self: flex-start;
  margin: 10px 0;
}

pre {
  background-color: #f0f0f0;
  padding: 10px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
