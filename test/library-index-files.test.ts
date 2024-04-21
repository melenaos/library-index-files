import path from 'path';
import fs from 'fs';
//import { promisify } from 'util';

// import rimraf from 'rimraf';

import generateIndexForFolder from '../src/generateIndexForFolder';

// const rmraf = promisify(rimraf);

async function clear() {
  //await rmraf(path.join(__dirname, './package-test/index.ts'));
}

describe('blah', () => {
  afterAll(() => {
    return clear();
  });

  it('Generates the index file content from Folders', async () => {
    const testFolder = path.join(__dirname, './package-test');
    const given = generateIndexForFolder(testFolder, 10);

    const indexContent = fs.readFileSync(
      path.join(testFolder, './index.ts'),
      'utf8'
    );
    const expectedContent = `export * from './a'
export * from './b'
export * from './c'
export * from './d';
export { default as e } from './e';
export { default as f } from './f';`;
    expect(given).toBeTruthy();
    expect(indexContent).toEqual(expectedContent);
  });
});
