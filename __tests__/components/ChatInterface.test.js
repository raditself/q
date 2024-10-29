import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ChatInterface from '../../components/ChatInterface';

jest.useFakeTimers();

describe('ChatInterface', () => {
  it('renders without crashing', () => {
    const { getByPlaceholderText, getByText } = render(<ChatInterface />);
    expect(getByPlaceholderText('Type your message...')).toBeInTheDocument();
    expect(getByText('Send')).toBeInTheDocument();
  });

  it('allows user to type and send a message', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(<ChatInterface />);
    const input = getByPlaceholderText('Type your message...');
    const sendButton = getByText('Send');

    fireEvent.change(input, { target: { value: 'Hello, AI!' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(input.value).toBe('');
    });

    expect(await findByText('Hello, AI!')).toBeInTheDocument();
  });

  it('displays AI response after sending a message', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(<ChatInterface />);
    const input = getByPlaceholderText('Type your message...');
    const sendButton = getByText('Send');

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);

    jest.advanceTimersByTime(1000);

    expect(await findByText('Test message')).toBeInTheDocument();
    expect(await findByText('AI response to: "Test message"')).toBeInTheDocument();
  });
});
