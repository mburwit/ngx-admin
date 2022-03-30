import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, takeWhile} from 'rxjs/operators';
import {NbMenuService} from '@nebular/theme';
import {TaskService} from '../../../@core/mock/tasks.service';
import {Task} from 'app/@core/data/tasks';

@Component({
  selector: 'ngx-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss'],
})
export class MyTasksComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
  }

  private alive = true;

  tasks: Task[];

  constructor(private taskService: TaskService, private menuService: NbMenuService) {
    this.taskService.getTasks().pipe(takeWhile(() => this.alive))
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
    this.menuService.onItemClick()
      .pipe(filter(({tag}) => tag && tag.startsWith('task-menu-'))).subscribe((event) => {
      this.onAction(event.item.data);
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  onAction(event: { action: string, id: string }) {
    if ('done' === event.action) {
      this.taskService.markDone(event.id);
    }
  }
}
