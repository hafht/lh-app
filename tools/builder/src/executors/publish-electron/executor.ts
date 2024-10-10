import { exec } from 'child_process';
import  * as devKit from '@nx/devkit';
import { ExecutorSchema } from './schema';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {executeCommand} from '../../../../utils/command'
import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires

export interface PublishElectronExecutorOptions {
  frontendProject: string
}


export default async function publishElectron(
  options: PublishElectronExecutorOptions,
  context: any
): Promise<{ success: boolean }> {
  console.log('=============================')
  console.log('Cleanup dist folder....')
  await executeCommand(`npx rimraf dist/app/*`)
  console.log('Build main process', options)
  await executeCommand(`npx nx run ${context.projectName}:build`)
  console.log('=============================')
  console.log('Build renderer process')
  await executeCommand(`npx nx run ${options.frontendProject}:build`)
  console.log('=============================')

  const packageFilePath = join(context.cwd, 'package.json')
  console.log('projectFolder', packageFilePath)

  const packageData = JSON.parse(readFileSync(packageFilePath, 'utf8').toString());
  packageData.name = 'Luma-Next'
  writeFileSync(packageFilePath, JSON.stringify(packageData))

  console.log('before pack hook', packageData)
  await executeCommand(`npx nx run ${context.projectName}:package`)
  return { success: true };
}

