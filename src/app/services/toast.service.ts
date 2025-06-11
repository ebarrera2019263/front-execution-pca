// src/app/services/toast.service.ts
import { Injectable } from '@angular/core';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  success(message: string, title: string = 'Éxito') {
    iziToast.success({
      title,
      message,
      position: 'topRight'
    });
  }

  error(message: string, title: string = 'Error') {
    iziToast.error({
      title,
      message,
      position: 'topRight'
    });
  }

  warning(message: string, title: string = 'Advertencia') {
    iziToast.warning({
      title,
      message,
      position: 'topRight'
    });
  }

  info(message: string, title: string = 'Información') {
    iziToast.info({
      title,
      message,
      position: 'topRight'
    });
  }
}
