import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-registered-block',
  templateUrl: './registered-block.component.html',
  styleUrls: ['./registered-block.component.scss'],
})
export class RegisteredBlockComponent implements OnInit {


  @Input('data') data: any;

  constructor() {
  }

  ngOnInit() {
  }

}
