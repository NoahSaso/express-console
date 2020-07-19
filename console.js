const fs = require('fs');
const path = require('path');
const repl = require('repl');

const context = {};

const root = path.join(__dirname, '..');

const importFile = (file, namer) => {
  const requiredObject = require(path.join(root, file));
  const filename = path.basename(file, path.extname(file));
  const name = namer(requiredObject, filename);
  context[name] = requiredObject;
};

const importFromFolder = (folder, namer) =>
  fs.readdirSync(path.join(root, folder)).forEach((file) => importFile(path.join(folder, file), namer));

// DEFINE NAMERS

// use for files that export classes directly
const classNamer = (requiredObject, filename) => requiredObject.name;
// use for files that export instances of a class (singletons)
const instanceNamer = (requiredObject, filename) => requiredObject.constructor.name;
// use if you want to use the filename
const fileNamer = (requiredObject, filename) => filename;

// ADD TO CONTEXT

// importFromFolder('src/models', classNamer);
// importFromFolder('src/controllers', instanceNamer);

// START REPL
const r = repl.start('> ');
Object.assign(r.context, context);

r.on('exit', () => {
  console.log('Exiting...');
  // tell node script to exit once repl exits
  process.exit();
});
