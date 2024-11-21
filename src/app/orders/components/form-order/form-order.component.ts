import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorService } from '../../../core/services/form-error.service';
import { ErrorMessages } from '../../../shared/interfaces/error-form.interface';
import { NgForOf } from '@angular/common';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../core/models/order.model';
import { firstValueFrom } from 'rxjs';
import { AlertService } from '../../../core/services/alert.service';


@Component({
  selector: 'app-form-order',
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './form-order.component.html',
  standalone: true,
  styleUrl: './form-order.component.scss'
})
export class FormOrderComponent {

  errorMessages: ErrorMessages = {};
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  constructor(
    private formErrorService: FormErrorService,
    private orderService: OrderService,
    private alertService: AlertService) {
  }

  async submit() {
    if (this.form.invalid) {
      this.errorMessages = this.formErrorService.getInvalidError(this.form.controls);
      return;
    }
    const order: Order = this.form.value

    try {
      await firstValueFrom(this.orderService.createOrder(order));
      this.alertService.showSuccess( 'Order created successfully');

    } catch (error) {
      this.alertService.showError( 'An error occurred while creating the order. Please try again later');
    }

  }

}
