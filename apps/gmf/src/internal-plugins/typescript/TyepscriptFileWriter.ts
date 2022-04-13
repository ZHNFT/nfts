import { writeFile } from 'fs/promises';

export interface WritableFile {
  fileName: string;
  content: string;
}

export class TypescriptFileWriter {
  private _writeProcesses: Promise<void>[];

  private _createWriteProcess(fileName: string, content: string) {
    const _writeFile = new Promise<void>((resolve, reject) => {
      writeFile(fileName, content)
        .then(() => {
          resolve();
        })
        .catch(reject);
    });
    this._writeProcesses.push(_writeFile);
  }

  public writeFiles(files: WritableFile[], emitCallback: () => void) {
    files.forEach(({ fileName, content }) => {
      this._createWriteProcess(fileName, content);
    });

    Promise.all(this._writeProcesses)
      .then(() => {
        emitCallback();
      })
      .catch(e => {
        console.log(e);
      });
  }
}
