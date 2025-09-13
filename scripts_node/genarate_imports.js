import fs from 'fs';
import path from 'path';

const secondParam = 2;
const folderArg = process.argv[secondParam];

if (!folderArg) {
  console.error('Error: Need path to folder!');
  process.exit(1);
}

const targetDir = path.resolve(process.cwd(), folderArg);
if (!fs.existsSync(targetDir)) {
  console.error(`Error: Folder does not exist: ${targetDir}`);
  process.exit(1);
}

if (!fs.statSync(targetDir).isDirectory()) {
  console.error(`Error: Path is not a folder: ${targetDir}`);
  process.exit(1);
}

const files = fs
  .readdirSync(targetDir)
  .filter((f) => f.endsWith('.jsx') || f.endsWith('.tsx') || f.endsWith('.ts'));

if (files.length === 0) {
  console.error(`Error: No .jsx, .tsx, or .ts files found in folder ${targetDir}`);
  process.exit(1);
}

const imports = files
  .map((f) => {
    const name = path.basename(f, path.extname(f));
    return `import ${name} from './${f}';`;
  })
  .join('\n');

const exports = `export const items = {\n  ${files.map((f) => path.basename(f, path.extname(f))).join(',\n  ')}\n};`;

try {
  fs.writeFileSync(path.join(targetDir, 'index.ts'), `${imports}\n\n${exports}\n`);
  console.log(`File index.ts was generated in ${targetDir}`);
} catch (err) {
  console.error('Error writing index.ts:', err);
  process.exit(1);
}
