import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(private http: HttpClient) { }

  uploadFile(file: Blob) {
    const dto = new FormData();
    dto.append('file-var', file);

    return this.http.post("http://localhost:3000/file-upload", dto);
  }

  deleteFile() {
    return this.http.delete("http://localhost:3000/file-delete");
  }

}
