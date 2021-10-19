import { Component, ViewChild } from '@angular/core';
import { FilePickerDirective } from 'src/app/file-picker.directive';
import { BlockchainServicesService } from 'src/app/services/blockchain-services.service';

@Component({
  selector: 'app-file-upload-page',
  templateUrl: './file-upload-page.component.html',
  styleUrls: ['./file-upload-page.component.css']
})
export class FileUploadPageComponent {

  _selectedFiles = [];
  _multiple = false;

  @ViewChild('buttonPicker', {static: true})
  _buttonPicker: FilePickerDirective;

  @ViewChild('dropZonePicker', { static: true })
  _dropZonePicker: FilePickerDirective;

  _onFilesChanged(files: FileList) {
    this._selectedFiles = [];
    for (let i = 0; i < files.length; i++) {
      this._selectedFiles.push(files[i]);
    }
  }

  _onReset() {
    this._selectedFiles = [];
  }

  _reset () {
    this._buttonPicker.reset();
    this._dropZonePicker.reset();
  }
}
