const fs = require('fs');

function ccwc(filePath, options) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const words = content.split(/\s+/);
    const characters = content.length;

    let result = '';

    if (options.includes('-l')) {
        result += `  ${lines.length} ${filePath}\n`;
    }
    
    if (options.includes('-w')) {
        result += `  ${words.length} ${filePath}\n`;
    }

    if (options.includes('-c') || options.includes('-m')) {
        result += `  ${characters} ${filePath}\n`;
    }

    return result.trim();
}

function defaultOptions(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const words = content.split(/\s+/);
    const characters = content.length;

    return `  ${lines.length}   ${words.length}  ${characters} ${filePath}`;
}

// Command line arguments
const argstr = process.argv.slice(2);
const filePath = argstr.pop();

if (argstr.length === 0) {
    // Default option
    console.log(defaultOptions(filePath));
} else {
    
  let output = '';

  for (const option of argstr) {
      output += ccwc(filePath, option);
  }
  
  console.log(output);
}
