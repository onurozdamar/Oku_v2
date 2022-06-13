import SQLite from 'react-native-sqlite-storage';

export class BaseManager {
  constructor() {
    this.sqlite = SQLite;
    this.sqlite.DEBUG(true);
    this.sqlite.enablePromise(true);
    this.openDatabase = () => {
      return new Promise((resolve, reject) => {
        this.sqlite
          .openDatabase({
            name: 'oku',
            location: 'default',
          })
          .then(db => {
            resolve(db);
          })
          .catch(err => {
            reject(err);
          });
      });
    };
  }

  createBookTable() {
    return new Promise((resolve, reject) => {
      this.openDatabase()
        .then(db => {
          db.executeSql(
            'CREATE TABLE IF NOT EXISTS Book (' +
              'bookId INTEGER PRIMARY KEY NOT NULL, bookName TEXT, ' +
              'page INTEGER, currentPage INTEGER, addDate TEXT, type TEXT, ' +
              'authorId INTEGER, FOREIGN KEY (authorId) REFERENCES Author (authorId));',
          )
            .then(val => {
              resolve(true);
            })
            .catch(err => {
              reject(false);
            });
        })
        .catch(err => {
          reject(false);
        });
    });
  }

  createAuthorTable() {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          'CREATE TABLE IF NOT EXISTS Author (' +
            'authorId INTEGER PRIMARY KEY NOT NULL ,' +
            'authorName TEXT UNIQUE, addDate TEXT);',
        )
          .then(val => {
            resolve(true);
          })
          .catch(err => {
            reject(false);
          });
      });
    });
  }

  createHistoryTable() {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          'CREATE TABLE IF NOT EXISTS History (' +
            'historyId INTEGER PRIMARY KEY NOT NULL ,' +
            'readDate TEXT, readTime TEXT, readPage INTEGER, desc TEXT, ' +
            'bookId INTEGER, FOREIGN KEY (bookId) REFERENCES Book (bookId));',
        )
          .then(val => {
            resolve(true);
          })
          .catch(err => {
            reject(false);
          });
      });
    });
  }

  addBook(model) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          'INSERT INTO Book (bookName, page, currentPage, addDate, type, authorId)' +
            `VALUES('${model.bookName}','${
              model.page
            }','${0}','${new Date()}','${model.type}','${model.authorId}')`,
        )
          .then(val => {
            resolve(val);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  addAuthor(model) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          'INSERT INTO Author (authorName, addDate)' +
            `VALUES('${model.authorName}','${new Date()}')`,
        )
          .then(val => {
            console.log(val);
            resolve(val[0].insertId);
          })
          .catch(err => {
            console.log('err', err);
            reject(err);
          });
      });
    });
  }

  addHistory(model) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          'INSERT INTO History (readDate, readTime, readPage, desc, bookId)' +
            `VALUES('${model.readDate}','${model.readTime}','${model.readPage}','${model.desc}','${model.bookId}')`,
        )
          .then(val => {
            resolve(val);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  getBooks() {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql('SELECT * FROM Book')
          .then(([values]) => {
            var array = [];

            for (let index = 0; index < values.rows.length; index++) {
              const element = values.rows.item(index);
              array.push(element);
            }

            resolve(array);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  getAuthors() {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql('SELECT * FROM Author')
          .then(([values]) => {
            var array = [];

            for (let index = 0; index < values.rows.length; index++) {
              const element = values.rows.item(index);
              array.push(element);
            }

            resolve(array);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  getHistories(bookId) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(`SELECT * FROM History WHERE bookId=${bookId}`)
          .then(([values]) => {
            var array = [];

            for (let index = 0; index < values.rows.length; index++) {
              const element = values.rows.item(index);
              array.push(element);
            }

            resolve(array);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  getAuthorByName(authorName) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(`SELECT * FROM Author WHERE authorName='${authorName}'`)
          .then(([values]) => {
            resolve(values.rows.item(0));
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  getLastReadByBook(bookId) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          `SELECT * FROM History WHERE bookId='${bookId}' ORDER BY readDate ASC`,
        )
          .then(([values]) => {
            console.log(values);
            resolve(values.rows.item(0));
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }
}
