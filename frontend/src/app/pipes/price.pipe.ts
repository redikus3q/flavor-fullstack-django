import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
//declarations in modulul in care trb folosit
export class PricePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value + ' LEI';
  }

}
