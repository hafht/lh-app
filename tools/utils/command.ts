import { exec } from "child_process";

export const executeCommand = (command: string, dir?: string, stdoutReturn?: any) => {
  return new Promise((resolve, reject) => {
    const processOption = dir ? { cwd: dir } : null;
    const process = exec(command, processOption);
    var stdout = '';
    var stderr = '';
    if (!process) {
      reject(null);
    }
    process.stdout?.on('data', (data) => {
      console.debug(data.toString('utf8').trim());
      stdout += `${data.toString('utf8').trim()}\n`;
    });
    process.stderr?.on('data', (data) => {
      console.debug(data.toString('utf8').trim());
      stderr += `${data.toString('utf8').trim()}\n`;
    });
    process.on('exit', (code, signal) => {
      console.debug(`executeCommand "${command}" finished`, { code, signal })
      setTimeout(() => { resolve(stdoutReturn ? stdout.trim() : code) }, 1000);
    });
    process.on('error', (err) => {
      console.debug(`executeCommand "${command}" error`, err);
      reject(stderr);
    });
  });
}
