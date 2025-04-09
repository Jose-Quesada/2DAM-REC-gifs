import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gifs-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{

  ngOnInit(): void {
    if ( !this.gif ) throw new Error ('Gif property is required');
  }

  @Input()
  gif!: Gif;
}
