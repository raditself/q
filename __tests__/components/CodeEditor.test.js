import React from 'react';
import { render, screen } from '@testing-library/react';
import CodeEditor from '../../components/CodeEditor';

// Mock the Monaco Editor
jest.mock('@monaco-editor/react', () => {
  const FakeEditor = jest.fn(({ defaultValue }) => (
    <div data-testid="mock-monaco-editor">{defaultValue}</div>
  ));
  return FakeEditor;
});

describe('CodeEditor', () => {
  it('renders without crashing', () => {
    render(<CodeEditor />);
    expect(screen.getByTestId('mock-monaco-editor')).toBeInTheDocument();
  });

  it('displays the default code', () => {
    render(<CodeEditor />);
    expect(screen.getByText('// Write your code here')).toBeInTheDocument();
  });
});
