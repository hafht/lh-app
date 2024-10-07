import { PromiseExecutor } from '@nx/devkit';
import { ExecutorSchema } from './schema';

const runExecutor: PromiseExecutor<ExecutorSchema> = async (options) => {
  console.log('Executor ran for ', options);
  return {
    success: true,
  };
};

export default runExecutor;
