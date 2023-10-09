import { Component, OnInit } from '@angular/core';
import { dummyUserProfile } from './dummy.data'
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-my-cv',
  templateUrl: './my-cv.component.html',
  styleUrls: ['./my-cv.component.scss']
})
export class MyCvComponent implements OnInit {
  profileDetails = dummyUserProfile;
  cv:any;

  constructor(
    private location : Location
  ) {}

  ngOnInit(): void {
    this.cv = this.profileDetails?.cv;
  }

  uploadCV(file: any) {
    const reader = new FileReader();
    reader.onload = e => {
      this.cv = reader.result
    };
    reader.readAsArrayBuffer(file);
  }

  goBack() {
    this.location.back()
  }

}
