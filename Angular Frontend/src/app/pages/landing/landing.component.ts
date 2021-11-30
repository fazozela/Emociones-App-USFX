import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { LandingService } from 'src/app/services/landingService/landing.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  fileExist: boolean = false;
  fileVideo: any;
  videoFileUrl: string = 'http://localhost:3000/file-serve/video1.mp4';
  timeLoader = 0;
  showLoader: boolean = false;
  showSuccess: boolean = false;

  constructor(private landingService: LandingService) { }

  ngOnInit(): void {
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);

    if (file) {
      this.fileExist = true;
      this.fileVideo = file;
    }

  }

  sendFile() {

    this.showLoader = true;

    const obs$ = interval(3000);
    obs$.subscribe(res => {
      if (this.timeLoader < 25) {
        this.timeLoader += res;
        console.log(this.timeLoader);
      } else {
        this.showLoader = false;
        console.log("imagen subida");
        this.showSuccess = true;
      }

    })



    this.landingService.uploadFile(this.fileVideo)
      .subscribe(res => {
        console.log(res);
      })
  }

  deleteFile() {
    this.landingService.deleteFile()
      .subscribe(res => {
        console.log("File deleted");
      })
  }

  countTime() {

  }

}
