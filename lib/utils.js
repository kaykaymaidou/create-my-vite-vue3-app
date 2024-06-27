import ora from 'ora';

export async function loadingFn(fn, msg, ...args) {
  const maxRequestCount = 3;
  const requestCounter = 0;
  async function runFn() {
    const spinner = ora(msg);
    spinner.start();
    try {
      const result = await fn(...args)
      spinner.succeed();
      return result;
    } catch (error) {
      spinner.fail('Something go wrong, refetching...');
      if (++requestCounter < maxRequestCount) {
        return runFn()
      } else {
        return Promise.reject(error);
      }
    }
  }
  return runFn();
};
