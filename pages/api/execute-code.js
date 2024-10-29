
import { exec } from 'child_process';
import { writeFile, unlink } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { language, code } = req.body;

  if (!language || !code) {
    return res.status(400).json({ error: 'Language and code are required' });
  }

  const filename = `${uuidv4()}.${getFileExtension(language)}`;

  try {
    await writeFile(filename, code);
    const output = await executeCode(language, filename);
    await unlink(filename);
    res.status(200).json({ output });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while executing the code' });
  }
}

function getFileExtension(language) {
  switch (language) {
    case 'javascript':
      return 'js';
    case 'python':
      return 'py';
    case 'java':
      return 'java';
    case 'cpp':
      return 'cpp';
    default:
      throw new Error('Unsupported language');
  }
}

function executeCode(language, filename) {
  return new Promise((resolve, reject) => {
    let command;
    switch (language) {
      case 'javascript':
        command = `node ${filename}`;
        break;
      case 'python':
        command = `python ${filename}`;
        break;
      case 'java':
        command = `javac ${filename} && java ${filename.replace('.java', '')}`;
        break;
      case 'cpp':
        command = `g++ ${filename} -o ${filename}.out && ./${filename}.out`;
        break;
      default:
        reject(new Error('Unsupported language'));
        return;
    }

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout || stderr);
      }
    });
  });
}
