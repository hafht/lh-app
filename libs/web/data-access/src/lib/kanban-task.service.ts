import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class KanbanTaskService {
  getAllTask$() {
    return of({})
  }
}

