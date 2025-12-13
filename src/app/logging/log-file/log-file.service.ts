import { Injectable, LogLevel } from '@nestjs/common';
import {
  createWriteStream,
  existsSync,
  mkdirSync,
  PathLike,
  renameSync,
  statSync,
  WriteStream,
} from 'fs';
import * as path from 'path';

@Injectable()
export class LogFileService {
  private readonly logStream: WriteStream;
  private readonly errorStream: WriteStream;
  private readonly maxSize: number;

  constructor() {
    const dir = process.env.LOG_DIR ?? 'logs';
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    this.maxSize = Number(process.env.LOG_MAX_FILE_SIZE);

    this.logStream = createWriteStream(path.join(dir, 'app.log'), {
      flags: 'a',
    });

    this.errorStream = createWriteStream(path.join(dir, 'app-error.log'), {
      flags: 'a',
    });
  }

  public write(message: string, logLevel: LogLevel) {
    const definedPath = this.defineFilePath(logLevel);
    try {
      if (logLevel === 'error') {
        this.rotateFileSize(this.errorStream, definedPath);
        this.errorStream.write(message + '\n');
      } else {
        this.rotateFileSize(this.logStream, definedPath);
        this.logStream.write(message + '\n');
      }
    } catch (err) {
      console.log(err);
    }
  }

  private defineFilePath(logLevel: LogLevel): PathLike {
    const dir = process.env.LOG_DIR ?? 'logs';
    return path.join(dir, `app-${logLevel}.logs`);
  }

  // there are a sync processes because we need to block event loop until the operation is done
  private rotateFileSize(stream: WriteStream, path: PathLike) {
    if (!existsSync(path)) {
      return;
    }
    const { size } = statSync(path);

    if (size === this.maxSize) {
      return;
    }
    stream.end();
    const rotated = `${path}.${Date.now()}`;
    renameSync(path, rotated);
  }
}
