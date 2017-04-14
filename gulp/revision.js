const path = require("path");

const manifest = {};

const parseFilenameWithoutVersion = chunk => {
  const oldFile = path.parse(chunk.revOrigPath);
  const filename = oldFile.base.slice(0, oldFile.base.indexOf("."));
  const ext = oldFile.base.slice(oldFile.base.indexOf("."));
  const newFileName = `${filename}-${chunk.revHash}${ext}`;
  return {
    old: oldFile.base,
    new: newFileName
  };
};

const parseFilenameWithVersion = file => {
  const newFile = path.parse(file.path);
  const ext = newFile.ext;
  const filename = newFile.base.slice(0, newFile.base.indexOf("-"));
  return {
    old: filename + ext,
    new: newFile.base
  };
};

const addToManifest = (chunk, enc, cb) => {
  let map;
  if (!("revHash" in chunk)) {
    map = parseFilenameWithVersion(chunk);
  } else {
    map = parseFilenameWithoutVersion(chunk);
  }
  manifest[map.old] = map.new;
  return cb(null, chunk);
};

const getManifest = str => manifest[str];

module.exports = {
  addToManifest: addToManifest,
  getManifest: getManifest
};
