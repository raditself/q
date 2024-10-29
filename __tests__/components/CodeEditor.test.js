

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CodeEditor from '../../components/CodeEditor';

// Mock the Monaco Editor
jest.mock('@monaco-editor/react', () => {
  return function DummyEditor({ value, language, onChange }) {
    return <textarea data-testid="mock-editor" value={value} onChange={(e) => onChange(e.target.value)} />;
  };
});

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ output: 'Mocked output' }),
  })
);

describe('CodeEditor', () => {
  beforeEach(() => {
    fetch.mockClear();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  // ... (keep other tests as they are)

  it('shows error message when code execution fails', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Execution failed' }),
      })
    );

    render(<CodeEditor />);
    const executeButton = screen.getByText('Execute Code');
    fireEvent.click(executeButton);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error executing code:', expect.any(Error));
      expect(screen.getByText('An error occurred while executing the code')).toBeInTheDocument();
    });
  });
});

