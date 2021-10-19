import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-file-retrieve',
  templateUrl: './file-retrieve.component.html',
  styleUrls: ['./file-retrieve.component.css']
})
export class FileRetrieveComponent implements OnInit {

  name = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

}
