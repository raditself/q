import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import ChatInterface from '../../components/ChatInterface';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ response: 'AI response' }),
  })
);

describe('ChatInterface', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders without crashing', () => {
    render(<ChatInterface />);
    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  });

  it('allows user to type and send a message', async () => {
    render(<ChatInterface />);
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'Hello, AI!' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(input).toHaveValue('');
    });

    expect(await screen.findByText('Hello, AI!')).toBeInTheDocument();
  });

  it('displays AI response after sending a message', async () => {
    render(<ChatInterface />);
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument();
      expect(screen.getByText('AI response')).toBeInTheDocument();
    });
  });

  it('does not send empty messages', async () => {
    render(<ChatInterface />);
    const sendButton = screen.getByText('Send');

    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(fetch).not.toHaveBeenCalled();
    });
  });

  it('displays multiple messages in order', async () => {
    render(<ChatInterface />);
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'First message' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('First message')).toBeInTheDocument();
      expect(screen.getByText('AI response')).toBeInTheDocument();
    });

    fireEvent.change(input, { target: { value: 'Second message' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Second message')).toBeInTheDocument();
      expect(screen.getAllByText('AI response')).toHaveLength(2);
    });

    const messages = screen.getAllByText(/message|AI response/i);
    expect(messages).toHaveLength(4);
    expect(messages[0]).toHaveTextContent('First message');
    expect(messages[1]).toHaveTextContent('AI response');
    expect(messages[2]).toHaveTextContent('Second message');
    expect(messages[3]).toHaveTextContent('AI response');
  });
});
