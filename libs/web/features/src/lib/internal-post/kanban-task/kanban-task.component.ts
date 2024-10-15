import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-kanban-task-container',
  standalone: true,
  template: ` <div class="kanban-task-container text-white">
    <div class="h-12 p-5">header</div>
    <div class="bg-amber-50 h-min">tab</div>
  </div> `,
})
export class KanbanTaskContainerComponent implements OnInit {
  ngOnInit() {}
}


interface KanbanTaskContainer {
  totals: {
    available: number;
    assigned: number;
    completed: number;
  }
}
