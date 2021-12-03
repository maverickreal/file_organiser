import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
//import organise from './organise';

const inputArr = process.argv.slice(2),
    types = {
        media: ['mp4', 'mkv', 'mp3', 'amv'],
        archives: ['gz', 'bz', 'zip', '7z', 'rar', 'tar', 'iso'],
        docs: ['pdf', 'doc', 'docx', 'ppt', 'xls', 'xlsx', 'odt', 'odf', 'txt', 'tex', 'ps'],
        app: ['deb', 'bin', 'sh'],
        img: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'],
        program: ['c', 'cpp', 'java', 'js', 'ts', 'py', 'go', 'html', 'css', 'xml']
    };

const treeFunc = () => {
    console.log(chalk.green('Tree Function executed.'));
}

const orgAcc = (src, dest) => {
    const files = fs.readdirSync(src);

    files.forEach(file => {
        const filePath = path.join(src, file),
            fileStat = fs.statSync(filePath);

        if (fileStat.isDirectory())
            return;

        const fileExt = path.extname(filePath).slice(1);

        for (const type in types) {
            if (types[type].includes(fileExt)) {
                console.log(chalk.yellow(`${file} is of type ${type}.`));
                return sendFile(filePath, dest, type);
            }
        }
        console.log(chalk.yellow(`${file} is of type unknown.`));
    });
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

    orgAcc(dirPath, destPath);
    console.log(chalk.green('Organise Function executed.'));
}

const sendFile = (src, dest, catg) => {
    const catPath = path.join(dest, catg);
    if (!fs.existsSync(catPath))
        fs.mkdirSync(catPath);

    fs.copyFileSync(src, path.join(catPath, path.basename(src)));

    console.log(chalk.green(`${path.basename(src)} moved to ${catg}`));
}

const helpFunc = () => {
    console.log(chalk.yellow(`All commands:
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