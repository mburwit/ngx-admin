import {of as observableOf, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Contacts, RecentUsers, UserData} from '../data/users';

@Injectable()
export class UserService extends UserData {

  private time: Date = new Date;

  private users = {
    nick: {id: 'nick', name: 'Peter Maler', picture: 'https://i.pravatar.cc/300'},
    eva: {id: 'eva', name: 'Eva Moor', picture: 'https://i.pravatar.cc/300'},
    jack: {id: 'jack', name: 'Jack Williams', picture: 'https://i.pravatar.cc/300'},
    lee: {id: 'lee', name: 'Lee Wong', picture: 'https://i.pravatar.cc/300'},
    alan: {id: 'alan', name: 'Alan Thompson', picture: 'https://i.pravatar.cc/300'},
    kate: {id: 'kate', name: 'Kate Martinez', picture: 'https://i.pravatar.cc/300'},
  };
  private types = {
    mobile: 'mobile',
    home: 'home',
    work: 'work',
  };
  private contacts: Contacts[] = [
    { user: this.users.nick, type: this.types.mobile },
    { user: this.users.eva, type: this.types.home },
    { user: this.users.jack, type: this.types.mobile },
    { user: this.users.lee, type: this.types.mobile },
    { user: this.users.alan, type: this.types.home },
    { user: this.users.kate, type: this.types.work },
  ];
  private recentUsers: RecentUsers[]  = [
    { user: this.users.alan, type: this.types.home, time: this.time.setHours(21, 12)},
    { user: this.users.eva, type: this.types.home, time: this.time.setHours(17, 45)},
    { user: this.users.nick, type: this.types.mobile, time: this.time.setHours(5, 29)},
    { user: this.users.lee, type: this.types.mobile, time: this.time.setHours(11, 24)},
    { user: this.users.jack, type: this.types.mobile, time: this.time.setHours(10, 45)},
    { user: this.users.kate, type: this.types.work, time: this.time.setHours(9, 42)},
    { user: this.users.kate, type: this.types.work, time: this.time.setHours(9, 31)},
    { user: this.users.jack, type: this.types.mobile, time: this.time.setHours(8, 0)},
  ];

  getUsers(): Observable<any> {
    return observableOf(this.users);
  }

  getContacts(): Observable<Contacts[]> {
    return observableOf(this.contacts);
  }

  getRecentUsers(): Observable<RecentUsers[]> {
    return observableOf(this.recentUsers);
  }
}
