import { Component, Input, Output, EventEmitter } from '@angular/core';

declare var require
const Swal = require('sweetalert2');

@Component({
  selector: 'app-profile-right-sidebar',
  templateUrl: './profile-right-sidebar.component.html',
  styleUrls: ['./profile-right-sidebar.component.scss']
})
export class ProfileRightSidebarComponent {
  cv:any;
  @Input() avatar : any;
  @Input() qrCode : any;
  @Input() qrCodeData : any;
  @Output() onUploadCv = new EventEmitter;

  uploadAvatar(e: any) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.avatar = reader.result
      };
      reader.readAsDataURL(file);
    }
  }

  uploadCV(e: any) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      this.onUploadCv.emit(file)
    }
  }

  copyMessage() {
    const selBox = document.createElement('textarea');
    selBox.style.opacity = '0';
    selBox.value = 'Some value';
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    Swal.fire({
      position: 'top-end',
      type: 'success',
      title: 'Data Copied: '+ selBox.value,
      showConfirmButton: false,
      timer: 1500
    })
  }
}
