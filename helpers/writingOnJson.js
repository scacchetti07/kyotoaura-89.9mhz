import fs from 'fs';

export function writingJson(id) {
    const jsonId = JSON.stringify(id);
    const filePath = "../config.json";

    fs.writeFile(filePath, jsonId, (err) => {
    if (err) {
        console.error(err);
        return
    } 
    });
}