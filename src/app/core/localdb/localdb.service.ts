import { Injectable } from '@angular/core';
import { LocalStorageDB } from '../../../vendor';

@Injectable()
export class LocaldbService {

  _db: localStorageDB;

  getDB() {
    return this._db || (this._db = this.newDB());
  }

  private newDB() {
    let db: localStorageDB = new LocalStorageDB('ecfront');
    if (db.isNew()) {
      db.createTable('history', ['ProductID', 'Name', 'Img', 'Price']);
    }
    db.commit();
    return db;
  }

}
