import {db} from "../db.js";

export const getMediaUrlById = async (id) => {
    if(!id) {
        return null;
    }

    const candidate = await getMediaById(id);

    if(!candidate.media) {
        return null;
    }

    return candidate.media.url;
}

export const getMediaById = (id) => {
    if(!id) {
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