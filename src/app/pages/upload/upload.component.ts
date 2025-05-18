import { Component } from '@angular/core';
import { ResumeService } from '../../services/resume.service';
import { ResumeUploadResponse } from '../../interfaces/models';


@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  selectedFile: File | null = null;
  uploadResult: ResumeUploadResponse | null = null;
  errorMessage = '';
  uploading = false;

  constructor(private resumeService: ResumeService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Please select a valid PDF file.';
    }
  }

  onUpload() {
    if (!this.selectedFile) {
      this.errorMessage = 'No file selected';
      return;
    }

    this.uploading = true;
    this.resumeService.uploadResume(this.selectedFile).subscribe({
      next: (res) => {
        this.uploadResult = res;
        this.errorMessage = '';
        this.uploading = false;
      },
      error: (err) => {
        this.errorMessage = 'Upload failed. Please try again.';
        this.uploading = false;
      }
    });
  }
}
