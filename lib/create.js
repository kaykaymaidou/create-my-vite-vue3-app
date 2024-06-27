import path from 'path';
import fsExtra from 'fs-extra';
import Creator from './creator.js';
import inquirer from 'inquirer';

async function create(projectName, options) {
  const targetDirectory = path.join(process.cwd(), projectName);

  if (fsExtra.existsSync(targetDirectory)) {
    if (options.force) {
      await fsExtra.removeSync(targetDirectory);
    } else {
      const { action } = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: `${projectName} is existed, are you want to overwrite this directory?`,
          choices: [
            {
              name: 'Yes',
              value: true
            },
            {
              name: 'No',
              value: false
            }
          ]
        }
      ]);
      if (!action) {
        return;
      } else {
        console.log('Overwriting...');
        await fsExtra.remove(targetDirectory);
        console.log('Overwriting Finished!')
      }
    }
  }
  // 创建项目
  const creator = new Creator(projectName, targetDirectory);
  creator.create();
};

export default create;