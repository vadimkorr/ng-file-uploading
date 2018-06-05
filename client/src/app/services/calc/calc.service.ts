import { Injectable } from '@angular/core';

const MAX_PERCENT = 100;

@Injectable({
  providedIn: 'root'
})
export class CalcService {
  getPartInPercent(current: number, total: number): number {
    return Math.floor(current / total * MAX_PERCENT);
  }
}
