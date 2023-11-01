import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent {
  selectedFiles?: FileList;
  fileId?:number;
  description?:string;
  progressInfos: any[] = [];
  message: string[] = [];

  fileInfos?: Observable<any>;

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  selectFiles(event:any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }
  onChangeFileId(event:any) {
    this.fileId = event.target.value;
    console.log("ID:" +this.fileId)
  }
  onChangeDescription(event:any) {
    this.description = event.target.value;
    console.log("Desciption: "+ this.description)
  }

  uploadFiles(): void {
    this.message = [];
  
    if (this.selectedFiles && this.fileId && this.description) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i], this.fileId, this.description);
      }
    }
  }

  upload(idx: number, file: File, fileId:number,description:string): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
  
    if (file) {
      this.uploadService.upload(file, fileId, description).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
          }
        },
        error: (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        }
      });
    }
  }
}
