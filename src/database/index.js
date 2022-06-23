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
          'SELECT *, Book.bookId FROM Book LEFT OUTER JOIN History ON' +
            ' History.bookId = Book.bookId GROUP BY Book.bookId' +
            ' ORDER BY readDate DESC, addDate DESC',
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
          'SELECT *, Book.bookId FROM Book LEFT OUTER JOIN History ON History.bookId = Book.bookId' +
            ' WHERE Book.currentPage>0 AND Book.currentPage<page GROUP BY Book.bookId ORDER BY readDate DESC',
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

  getBookWithHistoryAndAuthorById(bookId) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          `SELECT *, Book.bookId FROM Book INNER JOIN Author ON Book.authorId = Author.authorId
           LEFT OUTER JOIN History ON Book.bookId = History.bookId WHERE Book.bookId=${bookId}`,
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

  getBooksWithLastReadByAuthorId(authorId) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          `SELECT *, Book.bookId FROM Book LEFT OUTER JOIN History 
           ON Book.bookId = History.bookId WHERE Book.authorId=${authorId}
           GROUP BY History.bookId ORDER BY History.readDate DESC`,
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

  updateBook(model) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          'UPDATE Book SET ' +
            `bookName = '${model.bookName}',
             page = '${model.page}',
             currentPage = '${model.currentPage}',
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

  updateAuthor(model) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          'UPDATE Author SET ' +
            `authorName = '${model.authorName}'
             where authorId = ${model.authorId};`,
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

  deleteAuthorWithBooksAndHistory(id) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.transaction(tx => {
          tx.executeSql(
            `DELETE FROM History WHERE EXISTS (SELECT * FROM History INNER JOIN Book ON Book.bookId = History.bookId 
              INNER JOIN Author ON Book.authorId = Author.authorId WHERE Author.authorId=${id})`,
          );
          tx.executeSql('DELETE FROM Author WHERE authorId=' + id);
          tx.executeSql('DELETE FROM Book WHERE authorId=' + id);
        })
          .then(res => resolve(res))
          .catch(err => reject(err));
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
        db.executeSql(
          `SELECT * FROM History WHERE bookId=${bookId} ORDER BY readDate DESC`,
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

  updateHistory(model) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          'UPDATE History SET ' +
            `desc = '${model.desc}',
              readDate = '${model.readDate}',
              readPage = '${model.readPage}',
              readTime = '${model.readTime}',
              bookId = '${model.bookId}'
             where historyId = ${model.historyId};`,
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

  deleteHistoryByBookId(bookId) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql('DELETE FROM History where bookId=' + bookId)
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

  //#region STATISTICS
  getWeeklyReading() {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          `SELECT COUNT(*) AS count ,STRFTIME('%w',readDate) AS days FROM History GROUP BY days`,
        )
          .then(([values]) => {
            const days = ['Paz', 'Pts', 'Sal', 'Çar', 'Per', 'Cum', 'Cts'];
            const result = {labels: days, datasets: [{data: []}]};

            for (let index = 0; index < days.length; index++) {
              const element = values.rows.item(index) ?? {};
              if (element.days == index) {
                result.datasets[0].data.push(element.count);
              } else {
                result.datasets[0].data.push(0);
              }
            }

            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  getWeeklyReadingPageAndTime() {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          `SELECT SUM(readPage) AS pageSum, SUM(readTime) AS timeSum, 
          STRFTIME('%w',readDate) AS days FROM History GROUP BY days`,
        )
          .then(([values]) => {
            const days = ['Paz', 'Pts', 'Sal', 'Çar', 'Per', 'Cum', 'Cts'];
            const result = {
              labels: days,
              datasets: [
                {
                  data: [],
                  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                },
                {
                  data: [],
                  color: (opacity = 1) => `rgba(65, 134, 244, ${opacity})`,
                },
              ],
              legend: ['Sayfa', 'Saat'],
            };

            for (let index = 0; index < days.length; index++) {
              const element = values.rows.item(index) ?? {};
              if (element.days == index) {
                result.datasets[0].data.push(element.pageSum);
                result.datasets[1].data.push(element.timeSum);
              } else {
                result.datasets[0].data.push(0);
                result.datasets[1].data.push(0);
              }
            }

            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  getWeeklyReadingVelocity() {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          `SELECT CAST(SUM(readPage) AS float) / NULLIF(SUM(readTime), 1) AS velocity, 
          STRFTIME('%w',readDate) AS days FROM History GROUP BY days`,
        )
          .then(([values]) => {
            const days = ['Paz', 'Pts', 'Sal', 'Çar', 'Per', 'Cum', 'Cts'];
            const result = {
              labels: days,
              datasets: [
                {
                  data: [],
                  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                },
              ],
              legend: ['Hız Sayfa / Dakika'],
            };

            for (let index = 0; index < days.length; index++) {
              const element = values.rows.item(index) ?? {};
              if (element.days == index) {
                result.datasets[0].data.push(element.velocity);
              } else {
                result.datasets[0].data.push(0);
              }
            }

            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  getMonthlyReading() {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          `SELECT COUNT(*) AS count ,STRFTIME('%m',readDate) AS months FROM History GROUP BY months`,
        )
          .then(([values]) => {
            const months = [
              'Oca',
              'Şub',
              'Mar',
              'Nis',
              'May',
              'Haz',
              'Tem',
              'Ağu',
              'Eyl',
              'Eki',
              'Kas',
              'Ara',
            ];
            const result = {labels: months, datasets: [{data: []}]};

            for (let index = 0; index < months.length; index++) {
              const element = values.rows.item(index) ?? {};
              if (element.months * 1 === index + 1) {
                result.datasets[0].data.push(element.count);
              } else {
                result.datasets[0].data.push(0);
              }
            }

            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  getMonthlyReadingPageAndTime() {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          `SELECT SUM(readPage) AS pageSum, SUM(readTime) AS timeSum, 
          STRFTIME('%m',readDate) AS months FROM History GROUP BY months`,
        )
          .then(([values]) => {
            const months = [
              'Oca',
              'Şub',
              'Mar',
              'Nis',
              'May',
              'Haz',
              'Tem',
              'Ağu',
              'Eyl',
              'Eki',
              'Kas',
              'Ara',
            ];
            const result = {
              labels: months,
              datasets: [
                {
                  data: [],
                  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                },
                {
                  data: [],
                  color: (opacity = 1) => `rgba(65, 134, 244, ${opacity})`,
                },
              ],
              legend: ['Sayfa', 'Saat'],
            };

            for (let index = 0; index < months.length; index++) {
              const element = values.rows.item(index) ?? {};
              if (element.months * 1 === index + 1) {
                result.datasets[0].data.push(element.pageSum);
                result.datasets[1].data.push(element.timeSum);
              } else {
                result.datasets[0].data.push(0);
                result.datasets[1].data.push(0);
              }
            }

            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  getMonthlyReadingVelocity() {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          `SELECT CAST(SUM(readPage) AS float) / NULLIF(SUM(readTime), 1) AS velocity, 
          STRFTIME('%m',readDate) AS months FROM History GROUP BY months`,
        )
          .then(([values]) => {
            const months = [
              'Oca',
              'Şub',
              'Mar',
              'Nis',
              'May',
              'Haz',
              'Tem',
              'Ağu',
              'Eyl',
              'Eki',
              'Kas',
              'Ara',
            ];
            const result = {
              labels: months,
              datasets: [
                {
                  data: [],
                  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                },
              ],
              legend: ['Hız Sayfa / Dakika'],
            };

            for (let index = 0; index < months.length; index++) {
              const element = values.rows.item(index) ?? {};
              if (element.months * 1 === index + 1) {
                result.datasets[0].data.push(element.velocity);
              } else {
                result.datasets[0].data.push(0);
              }
            }

            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  getYearlyReading() {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          `SELECT COUNT(*) AS count ,STRFTIME('%Y',readDate) AS years FROM History GROUP BY years`,
        )
          .then(([values]) => {
            const result = {labels: [], datasets: [{data: []}]};

            for (let index = 0; index < values.rows.length; index++) {
              const element = values.rows.item(index);
              result.datasets[0].data.push(element.count);
              result.labels.push(element.years);
            }

            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  getYearlyReadingPageAndTime() {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          `SELECT SUM(readPage) AS pageSum, SUM(readTime) AS timeSum, 
          STRFTIME('%Y',readDate) AS years FROM History GROUP BY years`,
        )
          .then(([values]) => {
            const result = {labels: [], datasets: [{data: []}]};

            for (let index = 0; index < values.rows.length; index++) {
              const element = values.rows.item(index);
              result.datasets[0].data.push(element.pageSum);
              result.labels.push(element.years);
            }

            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  getYearlyReadingVelocity() {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          `SELECT CAST(SUM(readPage) AS float) / NULLIF(SUM(readTime), 1) AS velocity, 
          STRFTIME('%Y',readDate) AS years FROM History GROUP BY years`,
        )
          .then(([values]) => {
            const result = {
              labels: [],
              datasets: [
                {
                  data: [],
                  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                },
              ],
              legend: ['Hız Sayfa / Dakika'],
            };

            for (let index = 0; index < values.rows.length; index++) {
              const element = values.rows.item(index);
              result.datasets[0].data.push(element.velocity);
              result.labels.push(element.years);
            }

            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  getAuthorsBooksCount() {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          `SELECT COUNT(*) AS count, authorName FROM Book INNER JOIN 
                        Author ON Book.authorId = Author.authorId GROUP BY Book.authorId`,
        )
          .then(([values]) => {
            const color = count =>
              `rgb(${(count * 72 + 48) % 255}, ${(count * 48 + 72) % 255}, ${
                (count * 36 + 36) % 255
              })`;
            const result = [];

            for (let index = 0; index < values.rows.length; index++) {
              const element = values.rows.item(index);
              result.push({
                name: element.authorName,
                count: element.count,
                color: color(element.count),
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              });
            }

            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  getBookReadRate() {
    return new Promise((resolve, reject) => {
      this.openDatabase().then(db => {
        db.executeSql(
          `SELECT *, Book.bookId,SUM(History.readPage) AS sum FROM Book 
          LEFT OUTER JOIN History ON History.bookId = Book.bookId GROUP BY Book.bookId`,
        )
          .then(([values]) => {
            const result = [
              {
                name: 'Bitirilenler',
                sum: 0,
                color: '#00ffaa',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
              {
                name: 'Okunanlar',
                sum: 0,
                color: '#B8F1B0',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
              {
                name: 'Başlanmamışlar',
                sum: 0,
                color: '#E3FCBF',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
            ];

            for (let index = 0; index < values.rows.length; index++) {
              const element = values.rows.item(index);
              if (element.sum > 0) {
                if (element.sum >= element.page) {
                  result[0].sum++;
                } else {
                  result[1].sum++;
                }
              } else {
                result[2].sum++;
              }
            }

            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }
  //#endregion
}
