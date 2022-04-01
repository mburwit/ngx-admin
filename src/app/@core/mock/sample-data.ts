import {Task} from '../data/tasks';
import {v4 as uuid} from 'uuid';
import {Pathway} from '../data/patients';
import * as moment from 'moment';

export const patients = [
  {
    id: 'bdc511d3-2ea9-4b70-bf79-1384a812e09f',
    name: 'Jerry Mattedi', birthday: new Date(1987, 3, 5), diagnosis: 'Osteosarkom',
    pathway: new Pathway({
      lastChanged: moment().subtract(3, 'days').toDate(),
      anmeldung: {id: uuid(), status: 'green', timestamp: moment().subtract(3, 'days').toDate()},
    }),
  },
  {
    id: '2fadd966-c2b6-461c-8abf-f1109a2b6fab',
    name: 'Elianora Vasilov', birthday: new Date(1977, 8, 16), diagnosis: 'Kolonkarzinom',
    pathway: new Pathway({
      lastChanged: moment().subtract(2, 'days').toDate(),
      anmeldung: {id: uuid(), status: 'green', timestamp: moment().subtract(2, 'weeks').toDate()},
      material: {id: uuid(), status: 'green', timestamp: moment().subtract(2, 'days').toDate()},
      tzgCheck: {id: uuid(), status: 'red', note: 'Material nicht verwendbar'},
    }),
  },
  {
    id: 'ada2e505-3268-4e2a-9137-607b2e23d80e',
    name: 'Marcos Anguiano', birthday: new Date(2000, 9, 23), diagnosis: 'Adeno-CUP',
    pathway: new Pathway({
      lastChanged: moment().subtract(1, 'days').toDate(),
      anmeldung: {id: uuid(), status: 'green', timestamp: moment().subtract(2, 'weeks').toDate()},
      material: {id: uuid(), status: 'green', timestamp: moment().subtract(4, 'days').toDate()},
      tzgCheck: {id: uuid(), status: 'green', timestamp: moment().subtract(1, 'days').toDate()},
      sequencing: {id: uuid(), status: 'yellow'},
    }),
  },
  {
    id: '6973c15b-2e40-42b9-b9e3-24ffa5249517',
    name: 'Alvis Daen', birthday: new Date(1999, 1, 9), diagnosis: 'Chondrosarkom',
    pathway: new Pathway({
      lastChanged: moment().subtract(10, 'days').toDate(),
      anmeldung: {id: uuid(), status: 'green', timestamp: moment().subtract(19, 'days').toDate()},
      material: {id: uuid(), status: 'green', timestamp: moment().subtract(15, 'days').toDate()},
      tzgCheck: {id: uuid(), status: 'green', timestamp: moment().subtract(10, 'days').toDate()},
      sequencing: {id: uuid(), status: 'yellow'},
    }),
  },
  {
    id: 'dd206685-106d-4f86-9922-50fde1dddb73',
    name: 'Lissa Shipsey', birthday: new Date(1992, 8, 13), diagnosis: 'Multiples Myelom',
    pathway: new Pathway({
      lastChanged: moment().subtract(3, 'days').toDate(),
      anmeldung: {id: uuid(), status: 'green', timestamp: moment().subtract(3, 'months').subtract(30, 'days').toDate()},
      material: {id: uuid(), status: 'green', timestamp: moment().subtract(3, 'months').subtract(28, 'days').toDate()},
      tzgCheck: {id: uuid(), status: 'green', timestamp: moment().subtract(3, 'months').subtract(24, 'days').toDate()},
      sequencing: {id: uuid(), status: 'green', timestamp: moment().subtract(3, 'months').subtract(10, 'days').toDate()},
      mtb: {id: uuid(), status: 'green', timestamp: moment().subtract(3, 'months').toDate()},
      followUps: [
        {id: uuid(), title: 'Follow-up', status: 'green', timestamp: moment().subtract(3, 'days').toDate()},
        {id: uuid(), title: 'Follow-up', status: 'yellow'},
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
