/// <reference types="types-node-test" />

import test from 'node:test';
import CodeFrameError from './code-frame-error';
import assert from 'node:assert';

const someCode = `import { useState } from 'react';
export default function App() {
  const [ok, setOk] = useState(false);

  return (
    <>
      <h1>{ok ? 'All OK' : ':('}</h1>
      <button onClick={() => setOk((s) => !s)}>toggle</button>
    </>
  );
}
`;

test('code-frame-error', async (t) => {
  await t.test('is an error', () => {
    const err = new CodeFrameError('nope', {
      rawLines: 'asd',
      location: { start: { line: 0 } },
    });
    assert.ok(err instanceof Error, 'Is instanceof Error');
    assert.ok(err instanceof CodeFrameError, 'Is instanceof CodeFrameError');
  });

  await t.test('has stack', () => {
    const err = new CodeFrameError('nope', {
      rawLines: 'asd',
      location: { start: { line: 0 } },
    });

    assert.equal(typeof err.stack, 'string');
  });

  await t.test('prints nicely without file name', () => {
    const err = new CodeFrameError('Everything should be ok', {
      rawLines: someCode,
      location: {
        start: { line: 3, column: 32 },
        end: { line: 3, column: 37 },
      },
    });

    assert.equal(
      err.toString(),
      `CodeFrameError: Everything should be ok

  1 | import { useState } from 'react';
  2 | export default function App() {
> 3 |   const [ok, setOk] = useState(false);
    |                                ^^^^^
  4 |
  5 |   return (
  6 |     <>
`,
    );
  });

  await t.test('prints nicely with file name', () => {
    const err = new CodeFrameError('Everything should be ok', {
      rawLines: someCode,
      name: 'App.tsx',
      location: {
        start: { line: 3, column: 32 },
        end: { line: 3, column: 37 },
      },
    });

    assert.equal(
      err.toString(),
      `CodeFrameError: Everything should be ok

App.tsx:3:32
  1 | import { useState } from 'react';
  2 | export default function App() {
> 3 |   const [ok, setOk] = useState(false);
    |                                ^^^^^
  4 |
  5 |   return (
  6 |     <>
`,
    );
  });
});
