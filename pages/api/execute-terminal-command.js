
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const allowedCommands = ['ls', 'pwd', 'echo', 'cat', 'grep'];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { command } = req.body;

  if (!command) {
    return res.status(400).json({ error: 'Command is required' });
  }

  const commandParts = command.split(' ');
  const baseCommand = commandParts[0];

  if (!allowedCommands.includes(baseCommand)) {
    return res.status(403).json({ error: 'Command not allowed' });
  }

  try {
    const { stdout, stderr } = await execAsync(command);
    res.status(200).json({ output: stdout || stderr });
  } catch (error) {
    console.error('Error executing command:', error);
    res.status(500).json({ error: 'An error occurred while executing the command' });
  }
}
