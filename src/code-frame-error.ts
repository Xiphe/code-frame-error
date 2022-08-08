import type { SourceLocation, BabelCodeFrameOptions } from '@babel/code-frame';
import { codeFrameColumns } from '@babel/code-frame';

export interface File {
  name?: string;
  rawLines: string;
  location: SourceLocation;
}

export default class CodeFrameError extends Error {
  file: File;
  constructor(message: string, file: File) {
    super(message);
    this.file = file;
    Object.setPrototypeOf(this, CodeFrameError.prototype);
  }
  toString(options?: BabelCodeFrameOptions) {
    const { name, rawLines, location } = this.file;
    return [
      `CodeFrameError: ${this.message}`,
      '',
      name
        ? `${name}:${location.start.line}${
            location.start.column ? `:${location.start.column}` : ''
          }`
        : undefined,
      codeFrameColumns(rawLines, location, options),
      '',
    ]
      .filter((l) => l !== undefined)
      .join('\n');
  }
}
