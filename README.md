# code-frame-error

just an error with a [code frame](https://babeljs.io/docs/en/babel-code-frame)

## Install

```bash
npm install code-frame-error
# yarn add code-frame-error
```

## Use

```ts
import CodeFrameError, { File } from 'code-frame-error';
import type { BabelCodeFrameOptions } from '@babel/code-frame';

const file: File = {
  name: 'text.txt',
  rawLines: 'lorem ipsum sit amet',
  location: {
    start: { line: 1, column: 13 },
    end: { line: 1, column: 16 },
  },
};
const err = new CodeFrameError('Unexpected sit, expected dolor', file);

const options: BabelCodeFrameOptions = {};
console.log(err.toString(options));
/*

CodeFrameError: Unexpected sit, expected dolor

text.txt:1:13
> 1 | lorem ipsum sit amet
    |             ^^^

*/

console.log(err instanceof Error);
/* true */
```
