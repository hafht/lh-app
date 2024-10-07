import { exec } from 'child_process';
import  * as devKit from '@nx/devkit';
import { ExecutorSchema } from './schema';
import {executeCommand} from '../../../../utils/command'

export interface PublishElectronExecutorOptions {
  frontendProject: string
}


export default async function publishElectron(
  options: PublishElectronExecutorOptions,
  context: any
): Promise<{ success: boolean }> {
  console.log('Build main process')
  await executeCommand(`npx nx run ${context.projectName}:build`)
  console.log('Build renderer process')
  await executeCommand(`npx nx run ${options.frontendProject}:build`)
  return { success: true };
}

