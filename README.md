# generate-index-file

Automatic creation of index.ts file with export-values from all files and folders recursively.  


It will generate something like this for folders:
```
--src/
-----a/
-------a1.vue
-------a2.vue
-----b/
-------b1.vue
-------b2.vue
-----c/
```
Index.ts:
```ts
  export { default as a } from './a';
  export { default as b } from './b';
  export * as a from './a' 
  export * as b from './b' 
  //export * as c from './c'  // it will create the export only if there are files in it
```

a/Index.ts
```ts
  export { default as a1 } from './a1.vue';
  export { default as a2 } from './a2.vue';
```

b/Index.ts
```ts
  export { default as b1 } from './b1.vue';
  export { default as b2 } from './b2.vue';
```

### Install
npm:
```bash
npm install library-index-files
```

### Usage
npm
```bash
npx generate-index-file ./src
```


### Options
```
  --help
  --version  Show the version package
```

## Special thanks
This library comes from cloning [generate-index-file](https://github.com/GiancarlosIO/generate-index-file).

## Library structure

### GitHub Actions
There are two GitHub actions:
- CI: It builds and lint on every commit
- Publish NPM: With each new GitHub Release, a new NPM version is published.

#### Setup GitHub Actions
The only thing to configure is the NPM Access Token.
To do that go to the Repository's Settings -> Secrets and variables -> Actions and a new *Repository Secret* named `NPM_TOKEN` with the token key you created at the npmjs.com.