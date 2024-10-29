

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Terminal from '../../components/Terminal';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ output: 'Mocked command output' }),
  })
);

describe('Terminal', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders without crashing', () => {
    render(<Terminal />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('updates input when typing', () => {
    render(<Terminal />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'ls -la' } });
    expect(input).toHaveValue('ls -la');
  });

  it('executes command when pressing enter', async () => {
    render(<Terminal />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'ls -la' } });
    fireEvent.submit(input);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('/api/execute-terminal-command', expect.any(Object));
    });

    expect(await screen.findByText('Mocked command output')).toBeInTheDocument();
  });

  it('shows loading state while executing command', async () => {
    render(<Terminal />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'ls -la' } });
    fireEvent.submit(input);

    expect(screen.getByText('Executing command...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Executing command...')).not.toBeInTheDocument();
    });
  });

  it('shows error message when command execution fails', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Command execution failed' }),
      })
    );

    render(<Terminal />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'invalid-command' } });
    fireEvent.submit(input);

    expect(await screen.findByText('Command execution failed')).toBeInTheDocument();
  });

  it('clears input after submitting command', async () => {
    render(<Terminal />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'ls -la' } });
    fireEvent.submit(input);

    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  it('displays multiple commands and outputs', async () => {
    render(<Terminal />);
    const input = screen.getByRole('textbox');

    // First command
    fireEvent.change(input, { target: { value: 'command1' } });
    fireEvent.submit(input);

    await waitFor(() => {
      expect(screen.getByText('command1')).toBeInTheDocument();
      expect(screen.getByText('Mocked command output')).toBeInTheDocument();
    });

    // Second command
    fireEvent.change(input, { target: { value: 'command2' } });
    fireEvent.submit(input);

    await waitFor(() => {
      expect(screen.getByText('command2')).toBeInTheDocument();
      expect(screen.getAllByText('Mocked command output')).toHaveLength(2);
    });
  });
});

