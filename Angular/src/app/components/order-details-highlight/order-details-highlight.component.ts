import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-order-details-highlight',
  templateUrl: './order-details-highlight.component.html',
  styleUrls: ['./order-details-highlight.component.css'],
})
export class OrderDetailsHighlightComponent implements OnInit {
  constructor(public stateService: StateService) {}

  public query: string = '';

  public highlight(string: string) {
    if (!this.query) {
      string;
    }
    return string.replace(new RegExp(this.query, 'gi'), (match) => {
      return '<span class="highlightText">' + match + '</span>';
    });
  }

  ngOnInit(): void {}
}
