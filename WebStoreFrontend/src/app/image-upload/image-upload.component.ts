import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent {
  file?: any
  @Output() newImageUrlEvent = new EventEmitter<string>()

  constructor() {}

  async uploadFile() {
    let url = `https://api.cloudinary.com/v1_1/mmarino/image/upload`
    let formData = new FormData()
    formData.append('file', this.file)
    formData.append('upload_preset', 'unsigned_upload_preset')

    let response = await fetch(url, {
      method: 'POST',
      body: formData,
    })
    let data = await response.json()
    this.newImageUrlEvent.emit(data.secure_url)
  }

  onFileSelect(event: Event) {
    const element = event.target as HTMLInputElement
    let fileList: FileList | null = element.files
    this.file = fileList?.item(0)
    this.uploadFile()
  }
}
