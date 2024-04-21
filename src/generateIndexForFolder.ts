import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

import { getFileList, isDirectory } from './utils';

function generateIndexForFolders(srcFolder: string, maxDepth: number): boolean {
  maxDepth--;
  if (maxDepth < 0) return false;

  // Process Folders
  const fileList = getFileList(srcFolder);
  const filesAndFolders = fileList.map(f => path.join(srcFolder, f));

  // for each item in the folder
  const indexContentArr = filesAndFolders.map((filePath: string) => {
    const filename = path.basename(filePath);

    if (isDirectory(filePath)) {
      var hasIndex = generateIndexForFolders(filePath, maxDepth);
      if (hasIndex) return `export * from './${filename}'`;
      else return null;
    } else if (
      filename !== 'index.ts' &&
      filename !== 'index.tsx' &&
      !filename.includes('.d.ts')
    ) {
      const isTsxExtension = filename.includes('.tsx');
      const isVueExtension = filename.includes('.vue');
      const name = filename.split(
        isTsxExtension ? '.tsx' : isVueExtension ? '.vue' : '.ts'
      )[0];

      const fileContent = fs.readFileSync(filePath, 'utf8');

      const hasExportDefault = fileContent.includes('export default');

      const exportFileName = isVueExtension ? `${name}.vue` : name;
      return hasExportDefault
        ? `export { default as ${name} } from './${exportFileName}';`
        : `export * from './${exportFileName}';`;
    } else return null;
  });

  const fileLines = indexContentArr.filter(u => u !== null && u !== '');

  if (fileLines.length === 0) return false;

  try {
    fs.writeFileSync(path.join(srcFolder, 'index.ts'), fileLines.join('\n'));
  } catch (err) {
    if (err) console.error(err);
  }

  console.info(chalk.green(`\n${srcFolder} > index.ts \n`));

  return true;
}

export default generateIndexForFolders;
