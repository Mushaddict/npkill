import * as fs from 'fs';

import { IFileService } from '../interfaces/file-service.interface';
import { IListDirParams } from '../interfaces/list-dir-params.interface';
import { Observable } from 'rxjs';

export abstract class FileService implements IFileService {
  abstract getFolderSize(path: string): Observable<any>;
  abstract listDir(params: IListDirParams): Observable<{}>;
  abstract deleteDir(path: string): Promise<{}>;

  convertKbToGb(kb: number): number {
    const factorKbtoGb = 1048576;
    return kb / factorKbtoGb;
  }

  convertBytesToKb(bytes: number): number {
    const factorBytestoKb = 1024;
    return bytes / factorBytestoKb;
  }

  convertGbToMb(gb: number) {
    const factorGbtoMb = 1024;
    return gb * factorGbtoMb;
  }

  getFileContent(path: string): string {
    const encoding = 'utf8';
    return fs.readFileSync(path, encoding);
  }

  isSafeToDelete(path: string, targetFolder: string): boolean {
    return path.includes(targetFolder);
  }
}
