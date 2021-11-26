import {Injectable} from '@angular/core';
import {TaskData, Task} from '../data/tasks';
import {BehaviorSubject, Observable} from 'rxjs';
import {tasks} from './sample-data';

@Injectable()
export class TaskService extends TaskData {

  private tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(tasks);

  getTasks(): Observable<Task[]> {
    return this.tasks$.asObservable();
  }

  markDone(taskId: string) {
    this.tasks$.next(this.tasks$.getValue().filter(t => t.id !== taskId));
  }
}
