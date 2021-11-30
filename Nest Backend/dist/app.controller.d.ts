import { AppService } from './app.service';
import { Observable } from 'rxjs';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    uploadFile(files: any): string;
    findFile(filename: any, res: any): Observable<any>;
    deleteFile(): void;
}
