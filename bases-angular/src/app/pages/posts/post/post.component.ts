import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() datos_post: any;
  @Output() clickPost= new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.clickPost.emit(this.datos_post.id);
  }

}
