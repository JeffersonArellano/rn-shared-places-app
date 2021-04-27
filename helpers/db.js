import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db");

export const initDB = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((trans) => {
      trans.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL , description TEXT NOT NULL, imageUrl TEXT NOT NULL, ownerId TEXT NOT NULL, ownerLink TEXT NOT NULL, creationDate TEXT NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL,  address TEXT NULL); ",
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const insertPlace = (payload) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((trans) => {
      trans.executeSql(
        `INSERT INTO places (title, description, imageUrl, ownerId, ownerLink, creationDate, latitude, longitude, address) values(?,?,?,?,?,?,?,?,?)`,
        [
          payload.title,
          payload.description,
          payload.imageUrl,
          payload.ownerId,
          payload.ownerLink,
          payload.creationDate,
          payload.location.latitude,
          payload.location.longitude,
          payload.address,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((trans) => {
      trans.executeSql(
        `SELECT id, title, description, imageUrl, ownerId, ownerLink, creationDate, latitude, longitude, address FROM places`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};
