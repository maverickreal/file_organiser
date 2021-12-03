import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

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