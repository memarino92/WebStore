import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-upload-component',
  templateUrl: './upload-component.component.html',
  styleUrls: ['./upload-component.component.css'],
})
export class UploadComponentComponent implements OnInit {
  file?: any
  constructor() {}

  ngOnInit(): void {}

  uploadFile() {
    let url = `https://api.cloudinary.com/v1_1/mmarino/image/upload`
    let formData = new FormData()
    formData.append('file', this.file)
    formData.append('upload_preset', 'unsigned_upload_preset')

    fetch(url, {
      method: 'POST',
      body: formData,
    })
  }

  onFileSelect(event: Event) {
    const element = event.target as HTMLInputElement
    let fileList: FileList | null = element.files
    this.file = fileList?.item(0)
  }
}
