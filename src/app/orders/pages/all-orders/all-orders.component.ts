import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-all-orders',
  imports: [HeaderComponent],
  templateUrl: './all-orders.component.html',
  standalone: true,
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent {

  title = 'All Orders';


}
