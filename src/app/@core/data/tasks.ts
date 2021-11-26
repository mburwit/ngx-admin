import {Observable} from 'rxjs';
import {Patient} from './patients';

export class Task {
  id: string;
  status: string;
  title: string;
  patient?: Patient;
}

export abstract class TaskData {
  abstract getTasks(): Observable<Task[]>;
}
