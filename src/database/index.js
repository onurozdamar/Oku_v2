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

  //#region BOOK

  // bookId, bookName, page, currentPage, addDate, type, authorId
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

  addBook(model) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          'INSERT INTO Book (bookName, page, currentPage, addDate, type, authorId)' +
            `VALUES('${model.bookName}','${
              model.page
            }','${0}','${new Date().toISOString()}','${model.type}','${
              model.authorId
            }')`,
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

  getBooksWithLastRead() {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          'SELECT * FROM Book LEFT OUTER JOIN History ON History.bookId = Book.bookId GROUP BY Book.bookId ORDER BY readDate DESC',
        )
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

  getReadingBooks() {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          'SELECT * FROM Book WHERE currentPage>0 AND currentPage<page',
        )
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

  getBookById(bookId) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(`SELECT * FROM Book WHERE bookId=${bookId}`)
          .then(([values]) => {
            resolve(values.rows.item(0));
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  getBooksByAuthorId(authorId) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql('SELECT * FROM Book WHERE authorId=' + authorId)
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

  updateBook(model) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          'UPDATE Book SET ' +
            `bookName = '${model.bookName}',
             page = '${model.page}',
             currentPage = '${model.currentPage}',
             addDate = '${model.addDate?.toISOString()}',
             type = '${model.type}',
             authorId = '${model.authorId}'
             where bookId = ${model.bookId};`,
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

  updateBookPage(bookId, currentPage) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          'UPDATE Book SET ' +
            `currentPage = '${currentPage}'
             where bookId = ${bookId};`,
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

  decreaseBookPage(bookId, page) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          'UPDATE Book SET ' +
            `currentPage = currentPage - ${page}
             where bookId = ${bookId};`,
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

  deleteBook(id) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql('DELETE FROM Book where bookId=' + id)
          .then(val => {
            resolve(true);
          })
          .catch(err => {
            reject(false);
          });
      });
    });
  }
  //#endregion

  //#region AUTHOR

  // authorId, authorName, addDate
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

  addAuthor(model) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          'INSERT INTO Author (authorName, addDate)' +
            `VALUES('${model.authorName}','${new Date().toISOString()}')`,
        )
          .then(val => {
            resolve(val[0].insertId);
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

  getAuthorById(authorId) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(`SELECT * FROM Author WHERE authorId='${authorId}'`)
          .then(([values]) => {
            resolve(values.rows.item(0));
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  deleteAuthor(id) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql('DELETE FROM Author where authorId=' + id)
          .then(val => {
            resolve(true);
          })
          .catch(err => {
            reject(false);
          });
      });
    });
  }
  //#endregion

  //#region HISTORY

  // historyId, readDate, readTime, readPage, desc, bookId
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

  addHistory(model) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          'INSERT INTO History (readDate, readTime, readPage, desc, bookId)' +
            `VALUES('${model.readDate?.toISOString()}','${model.readTime}','${
              model.readPage
            }','${model.desc}','${model.bookId}')`,
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

  getLastReadByBook(bookId) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          `SELECT * FROM History WHERE bookId='${bookId}' ORDER BY readDate DESC LIMIT 1`,
        )
          .then(([values]) => {
            resolve(values.rows.item(0) || {});
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  getLastReadedBook() {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          `SELECT * FROM Book WHERE bookId=(SELECT bookId FROM History ORDER BY readDate DESC LIMIT 1)`,
        )
          .then(([values]) => {
            resolve(values.rows.item(0));
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  deleteHistory(model) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql('DELETE FROM History where historyId=' + model.historyId)
          .then(val => {
            this.decreaseBookPage(model.bookId, model.readPage);
            resolve(true);
          })
          .catch(err => {
            reject(false);
          });
      });
    });
  }
  //#endregion
}
