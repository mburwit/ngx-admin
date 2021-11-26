import {Task} from '../data/tasks';
import {v4 as uuid} from 'uuid';
import {Pathway} from '../data/patients';
import * as moment from 'moment';

export const patients = [
  {
    id: 'jerry',
    name: 'Jerry Mattedi', birthday: new Date(1987, 3, 5), diagnosis: 'Osteosarkom',
    pathway: new Pathway({
      lastChanged: moment().subtract(3, 'days').toDate(),
      anmeldung: {status: 'green', timestamp: moment().subtract(3, 'days').toDate()},
    }),
  },
  {
    id: 'elianora',
    name: 'Elianora Vasilov', birthday: new Date(1977, 8, 16), diagnosis: 'Kolonkarzinom',
    pathway: new Pathway({
      lastChanged: moment().subtract(2, 'days').toDate(),
      anmeldung: {status: 'green', timestamp: moment().subtract(2, 'weeks').toDate()},
      material: {status: 'green', timestamp: moment().subtract(2, 'days').toDate()},
      tzgCheck: {status: 'red', note: 'Material nicht verwendbar'},
    }),
  },
  {
    id: 'marcos',
    name: 'Marcos Anguiano', birthday: new Date(2000, 9, 23), diagnosis: 'Adeno-CUP',
    pathway: new Pathway({
      lastChanged: moment().subtract(1, 'days').toDate(),
      anmeldung: {status: 'green', timestamp: moment().subtract(2, 'weeks').toDate()},
      material: {status: 'green', timestamp: moment().subtract(4, 'days').toDate()},
      tzgCheck: {status: 'green', timestamp: moment().subtract(1, 'days').toDate()},
      sequencing: {status: 'yellow'},
    }),
  },
  {
    id: 'alvis',
    name: 'Alvis Daen', birthday: new Date(1999, 1, 9), diagnosis: 'Chondrosarkom',
    pathway: new Pathway({
      lastChanged: moment().subtract(10, 'days').toDate(),
      anmeldung: {status: 'green', timestamp: moment().subtract(19, 'days').toDate()},
      material: {status: 'green', timestamp: moment().subtract(15, 'days').toDate()},
      tzgCheck: {status: 'green', timestamp: moment().subtract(10, 'days').toDate()},
      sequencing: {status: 'yellow'},
    }),
  },
  {
    id: 'lissa',
    name: 'Lissa Shipsey', birthday: new Date(1992, 8, 13), diagnosis: 'Multiples Myelom',
    pathway: new Pathway({
      lastChanged: moment().subtract(3, 'days').toDate(),
      anmeldung: {status: 'green', timestamp: moment().subtract(3, 'months').subtract(30, 'days').toDate()},
      material: {status: 'green', timestamp: moment().subtract(3, 'months').subtract(28, 'days').toDate()},
      tzgCheck: {status: 'green', timestamp: moment().subtract(3, 'months').subtract(24, 'days').toDate()},
      sequencing: {status: 'green', timestamp: moment().subtract(3, 'months').subtract(10, 'days').toDate()},
      mtb: {status: 'green', timestamp: moment().subtract(3, 'months').toDate()},
      followUps: [
        {title: 'Follow-up', status: 'green', timestamp: moment().subtract(3, 'days').toDate()},
        {title: 'Follow-up', status: 'yellow'},
      ],
    }),
  },
];

export const appointments = [
  {id: uuid(), time: moment().add(12, 'days').toDate(), title: 'MTB', attendees: patients.filter(p => p.id === 'alvis')},
];

export const tasks: Task[] = [
  {id: uuid(), status: 'todo', title: 'Material erneut zusenden', patient: patients.find(p => p.id === 'elianora')},
];
