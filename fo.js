import chalk from 'chalk';
import path from 'path';
import fs from 'fs';

const inputArr = process.argv.slice(2);

const treeFunc = () => {
    console.log(chalk.green('Tree Function executed.'));
}

const organiseFunc = (dirPath) => {
    if (dirPath === undefined)
        return console.log(chalk.red('Invalid path provided.'));

    if (!fs.existsSync(dirPath))
        return console.log(chalk.red('Invalid path provided.'));

    const destPath = path.join(dirPath, 'organised_files');

    if (fs.existsSync(destPath))
        return console.log(chalk.red('organised_files directory already exists.'));

    fs.mkdirSync(destPath);

    console.log(chalk.green('Organise Function executed.'));
}

const helpFunc = () => {
    console.log(chalk.green(`All commands:
    1. tree
    2. organise
    3. help`));
}

switch (inputArr[0]) {
    case 'tree':
        treeFunc();
        break;
    case 'organise':
        organiseFunc(inputArr[1]);
        break;
    case 'help':
        helpFunc();
        break;
    default:
        console.log(chalk.red('Invalid command'));
        break;
}