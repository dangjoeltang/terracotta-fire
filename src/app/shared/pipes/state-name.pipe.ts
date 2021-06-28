import { Pipe, PipeTransform } from '@angular/core';
import { StatesEnum } from '../constants/state-abbreviations';

@Pipe({
  name: 'stateName'
})
export class StateNamePipe implements PipeTransform {
  public stateEnum = StatesEnum;

  transform(value: string): string {
    return StatesEnum[value]
  }

}
