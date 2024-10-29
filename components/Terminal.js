import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const TerminalComponent = () => {
  const terminalRef = useRef(null);

  useEffect(() => {
    const term = new Terminal();
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    term.open(terminalRef.current);
    fitAddon.fit();

    term.write('Welcome to the BLACKBOXAI Terminal!\r\n');
    term.write('$ ');

    term.onKey(({ key, domEvent }) => {
      const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

      if (domEvent.keyCode === 13) {
        term.write('\r\n$ ');
      } else if (domEvent.keyCode === 8) {
        // Do not delete the prompt
        if (term._core.buffer.x > 2) {
          term.write('\b \b');
        }
      } else if (printable) {
        term.write(key);
      }
    });

    return () => {
      term.dispose();
    };
  }, []);

  return <div ref={terminalRef} style={{ height: '400px' }} />;
};

export default TerminalComponent;
