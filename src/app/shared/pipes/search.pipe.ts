import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[] | null, key: string, term: string | undefined): any[] {
    if (!term) { return items || []; }
    return Object.assign([], items).filter(
      item => `${item[key]}`.toLowerCase().indexOf(term.toLowerCase()) > -1
    );
  }

}
