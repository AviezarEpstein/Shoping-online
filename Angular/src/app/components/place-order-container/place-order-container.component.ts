import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-place-order-container',
  templateUrl: './place-order-container.component.html',
  styleUrls: ['./place-order-container.component.css']
})
export class PlaceOrderContainerComponent implements OnInit {

  constructor(public stateService: StateService) { }

  ngOnInit(): void {
    this.stateService.isBeforeCheckout = false;
  }

  ngOnDestroy(): void{
    this.stateService.isBeforeCheckout = true;
  }

}
