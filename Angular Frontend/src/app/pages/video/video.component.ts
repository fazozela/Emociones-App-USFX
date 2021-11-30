import {Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FaceApiService} from "../../services/faceApiService/face-api.service";
import { VideoService } from "../../services/videoService/video.service";

import * as _ from 'lodash';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoElement?: ElementRef;

  modelsReady: boolean = false;
  listEvents: Array<any> = [];
  videoPath = 'http://localhost:3000/file-serve/video1.mp4';

  results = false;

  basicData: any;

  basicOptions: any;

  // Data
  listExpressions: any = [];

  //Data Expressions
  neutralExp: number[] = [];
  happyExp: number[] = [];
  sadExp: number[] = [];
  angryExp: number[] = [];
  fearfulExp: number[] = [];
  disgustedExp: number[] = [];
  surprisedExp: number[] = [];

  //Data Expressions Mean
  neutralMean?: number;
  happyMean?: number;
  sadMean?: number;
  angryMean?: number;
  fearfulMean?: number;
  disgustedMean?: number;
  surprisedMean?: number;


  constructor(
    private faceApiService: FaceApiService,
    private videoService: VideoService,
  ) {

  }

  ngOnInit(): void {
    this.listenerEvents();
    this.listenerEventsData();
  }

  ngOnDestroy(): void {
    this.listEvents.forEach(event => event.unsubscribe());
  }

  checkFace(){
    setInterval(async () => {
      await this.videoService.getLandMark(this.videoElement)
    }, 1000)
  }

  listenerEvents(){
    const observer1$ = this.faceApiService.cbModels.subscribe(res => {this.modelsReady = true; this.checkFace();})

    const observer2$ = this.videoService.cbAi.subscribe(({ expressions })=>{})

    this.listEvents = [observer1$, observer2$]
  }

  playVideo(){
    console.log("************ Play Video ************");

    const myVideo: any = document.getElementById("videoElement");

    if (myVideo.paused){
      myVideo.play();
    }
    else{
      myVideo.pause();
    }
  }

  reloadPage() {
    window.location.reload();
  }

  // DataFunctions
  listenerEventsData(){
    const observer2$ = this.videoService.cbAi.subscribe(({ expressions })=>{
      this.listExpressions = _.map(expressions, (value, name) => {
        return {name, value}
      });

      //NEUTRAL
      this.neutralExp.push(this.listExpressions[0].value);
      //HAPPY
      this.happyExp.push(this.listExpressions[1].value);
      //SAD
      this.sadExp.push(this.listExpressions[2].value);
      //ANGRY
      this.angryExp.push(this.listExpressions[3].value);
      //FEARFUL
      this.fearfulExp.push(this.listExpressions[4].value);
      //DISGUSTED
      this.disgustedExp.push(this.listExpressions[5].value);
      //SURPRISED
      this.surprisedExp.push(this.listExpressions[6].value);

    })

    this.listEvents = [observer2$]
  }

  seeResults() {
    this.results = true;

    let total = this.neutralExp.length;

    let sumNeutral = 0;
    let sumHappy = 0;
    let sumSad = 0;
    let sumAngry = 0;
    let sumFearful = 0;
    let sumDisgusted = 0;
    let sumSurprised = 0;

    for (let i = 0; i < this.neutralExp.length; i++) {
      sumNeutral += this.neutralExp[i];
      sumHappy += this.happyExp[i];
      sumSad += this.sadExp[i];
      sumAngry += this.angryExp[i];
      sumFearful += this.fearfulExp[i];
      sumDisgusted += this.disgustedExp[i];
      sumSurprised += this.surprisedExp[i];
    }

    //Mean
    this.neutralMean = (sumNeutral / total) * 100;
    this.happyMean = (sumHappy / total) * 100;
    this.sadMean = (sumSad / total) * 100;
    this.angryMean = (sumAngry / total) * 100;
    this.fearfulMean = (sumFearful / total) * 100;
    this.disgustedMean = (sumDisgusted / total) * 100;
    this.surprisedMean = (sumSurprised / total) * 100;


    console.log(`Promedio Neutro: ${this.neutralMean}`);
    console.log(`Promedio Happy: ${this.happyMean}`);
    console.log(`Promedio Sad: ${this.sadMean}`);
    console.log(`Promedio Angry: ${this.angryMean}`);
    console.log(`Promedio Fearful: ${this.fearfulMean}`);
    console.log(`Promedio Disgusted: ${this.disgustedMean}`);
    console.log(`Promedio Surprised: ${this.surprisedMean}`);

    this.basicData = {
        labels: ['Neutral', 'Feliz', 'Triste', 'Enojado', 'Asustado', 'Disgustado', 'Sorprendido'],
        datasets: [
            {
                label: 'Resumen Emociones',
                backgroundColor: '#ffcd2e',
            data: [
              this.neutralMean,
              this.happyMean,
              this.sadMean,
              this.angryMean,
              this.fearfulMean,
              this.disgustedMean,
              this.surprisedMean
            ]
            }
        ]
    };


  }



}
