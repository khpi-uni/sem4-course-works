import {db} from "../db.js";

export const getMediaUrlById = async (id) => {
    if (!id) {
        return null;
    }

    const candidate = await getMediaById(id);

    if (!candidate.media) {
        return null;
    }

    return candidate.media.url;
}

export const getMediaById = (id) => {
    if (!id) {
        return null;
    }

    let sqlQuery = 'SELECT * FROM media WHERE id=?';

    return new Promise((resolve, reject) => {
        db.query(sqlQuery, [id], (err, results) => {
            if (err) {
                reject({error: err, media: null});
            }

            resolve({media: results[0]});
        });
    });
}

export const getMediaIdByUrl = (url) => {
    let sqlQuery = 'SELECT * FROM media WHERE url=?';
    return new Promise((resolve, reject) => {
        db.query(sqlQuery, [url], (err, results) => {
            if (err) {
                reject({error: err, media: null});
            }

            resolve({media: results[0]});
        })
    })
}

export const getMediaIdByUrlOrInsert = async (url) => {
    if (!url) {
        return null;
    }

    const candidate = await getMediaIdByUrl(url);

    if (candidate.media) {
        return candidate.media.id;
    }

    let sqlQuery = 'INSERT INTO media (url, type, title, alt) VALUES (?, "image", "", "")';
    return new Promise((resolve, reject) => {
        db.query(sqlQuery, [url], (err, results) => {
            if (err) {
                reject(null);
            }

            resolve(results.insertId);
        })
    })
}