import { Component } from '@angular/core'

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent {
  file?: any
  constructor() {}

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
