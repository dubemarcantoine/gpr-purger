import * as glob from "glob";

const Jimp = require("jimp");

const folder = "/home/madube/projects/tourisme-estrie/location-tourisme-estrie-utils/lte-watermarker/output";

const compress = async (imagePath, imageName) => {
    console.log(`Processing ${imageName}`);
    const [image] = await Promise.all([
        Jimp.read(`${imagePath}/${imageName}`),
    ]);
    image.resize(image.bitmap.width / 2, image.bitmap.height / 2)
        .quality(80)
        .write(`output/${imageName}`);
};

const start = async () => {
    glob("**/*", {
        cwd: folder
    }, async (er, filenames) => {
        await asyncForEach(filenames, async (filename) => {
            await compress(folder, filename);
        });
        console.log('Finished processing!');
    });
};

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

start();
