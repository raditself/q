import React from 'react';
import { render } from '@testing-library/react';
import TerminalComponent from '../../components/Terminal';

// Mock the xterm library
jest.mock('xterm', () => ({
  Terminal: jest.fn().mockImplementation(() => ({
    loadAddon: jest.fn(),
    open: jest.fn(),
    write: jest.fn(),
    onKey: jest.fn(),
    dispose: jest.fn(),
  })),
}));

jest.mock('xterm-addon-fit', () => ({
  FitAddon: jest.fn().mockImplementation(() => ({
    fit: jest.fn(),
  })),
}));

describe('TerminalComponent', () => {
  it('renders without crashing', () => {
    const { container } = render(<TerminalComponent />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
