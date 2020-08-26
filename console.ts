import { Context } from 'vm';
import repl from 'repl';

import * as Controllers from '../controllers';
import * as Models from '../models';

const context: Context = {};

const setupImport = (imported: Record<string, unknown>) =>
  Object.entries(imported).forEach(([name, importedModule]) => {
    context[name] = importedModule;
  });

// ADD TO CONTEXT
setupImport(Models);
setupImport(Controllers);

// START REPL
const r = repl.start('> ');
Object.assign(r.context, context);

r.on('exit', () => {
  console.log('Exiting...');
  // tell node script to exit once repl exits
  process.exit();
});
