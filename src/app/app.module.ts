import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms';
import { FlexLayoutModule} from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';


import { AppComponent } from './app.component';
import { SelectedFilesTableComponent } from './components/selected-files-table/selected-files-table.component';
import { FileUploadPageComponent } from './components/file-upload-page/file-upload-page.component';
import { FilePickerDirective } from './file-picker.directive';
import { TokenDetailsComponent } from './components/token-details/token-details.component';
import { FileRetrieveComponent } from './components/file-retrieve/file-retrieve.component';
import { DiskSpaceShareComponent } from './components/disk-space-share/disk-space-share.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
//import { RetrieveFilesComponent } from './components/retrieve-files/retrieve-files.component';
// import { FilePickerDirective } from './file-picker.directive';



@NgModule({
  declarations: [
    AppComponent,
    SelectedFilesTableComponent,
    FileUploadPageComponent,
    FilePickerDirective,
    TokenDetailsComponent,
    FileRetrieveComponent,
    DiskSpaceShareComponent,
    ConfirmDialogComponent,
    //RetrieveFilesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule, 
    FlexLayoutModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatDividerModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
