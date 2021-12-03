import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import organise from './organise.js';
import types from './types.js';

const inputArr = process.argv.slice(2);

const treeAcc = (dirpath, indentStr = ' ', indentChar = ' ') => {
    const baseName = path.basename(dirpath);
    indentStr = `${indentStr}${indentChar}`;

    if (fs.lstatSync(dirpath).isFile() === true)
        return console.log(chalk.magentaBright('F:') + chalk.yellow(indentStr + '└──  ' + baseName));

    console.log(chalk.cyan('D:') + chalk.yellow(indentStr + '├── ' + baseName));
    const children = fs.readdirSync(dirpath);
    for (const child of children)
        treeAcc(path.join(dirpath, child), indentStr + ' ');
}

const treeFunc = (dirPath) => {
    if (dirPath === undefined)
        return console.log(chalk.red('invalid path provided!'));

    if (fs.existsSync(dirPath))
        treeAcc(dirPath);

    console.log(chalk.green('Tree Function executed.'));
}

const helpFunc = () => {
    console.log(chalk.yellow(`All commands:
    1. tree
    2. organise
    3. help`));
}

switch (inputArr[0]) {
    case 'tree':
        treeFunc(inputArr[1]);
        break;
    case 'organise':
        organise(inputArr[1]);
        break;
    case 'help':
        helpFunc();
        break;
    default:
        console.log(chalk.red('Invalid command'));
        break;
}