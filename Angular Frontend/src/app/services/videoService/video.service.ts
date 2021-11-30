import { HttpClient } from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import {FaceApiService} from "../faceApiService/face-api.service";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  cbAi: EventEmitter<any> = new EventEmitter<any>();

  constructor(private faceApiService: FaceApiService, private http: HttpClient) {}

  getLandMark = async (videoElement: any) => {

    const {globalFace} = this.faceApiService;

    const detectionsFaces = await globalFace.detectAllFaces(videoElement.nativeElement).withFaceExpressions();
    // console.log(detectionsFaces);

    const expressions = detectionsFaces[0].expressions || null;

    this.cbAi.emit({
      expressions
    })
  }

  getFileVideo() {
    return this.http.get("http://localhost:3000/file-serve/video1.mp4", { responseType: 'blob' });
  }

}
