import { fetchGitRepository } from './request.js';
import { loadingFn } from './utils.js';
import downloadGitRepository from 'download-git-repo';
import inquirer from 'inquirer';
import chalk from 'chalk';
import util from 'util';

function Creator(projectName, targetDirectory) {
  this.projectName = projectName;
  this.targetDirectory = targetDirectory;
  this.downloadGitRepository = util.promisify(downloadGitRepository);
};

Creator.prototype.fetchGitRepository = async function() {
  const branches = await loadingFn(fetchGitRepository, 'Waiting for fetch resources...');
  return branches;
};

Creator.prototype.download = async function(branch) {
  const requestURL = `rippi-cli-template/react/#${branch}`;
  await this.downloadGitRepository(requestURL, this.targetDirectory);
  console.log(chalk.green('Download finished.'));
};

Creator.prototype.create = async function() {
  const branches = await this.fetchGitRepository();
  const { currentBranch } = await inquirer.prompt([
    {
      type: 'list',
      name: 'currentBranch',
      message: 'Please choose current version:',
      choices: branches.filter(branch => branch.name !== 'main').map((branch) => ({
        name: branch.name,
        value: branch.name,
      }))
    }
  ]);
  await this.download(currentBranch);
};

export default Creator;
