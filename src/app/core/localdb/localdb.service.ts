import { Injectable } from '@angular/core';
require('./localStorageDB');

@Injectable()
export class LocaldbService {

  _db: localStorageDB;

  getDB() {
    return this._db || (this._db = this.newDB());
  }

  private newDB() {
    let db = new localStorageDB('ecfront');
    if (db.isNew()) {
      db.createTable('history', ['ProductID', 'Name', 'Img', 'Price']);
    }
    db.commit();
    return db;
  }

}
