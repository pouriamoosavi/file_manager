const createError = require('http-errors');
const express = require("express");
const router = express.Router();
const fs = require("fs");
const mime = require("mime-types");

router.get("*", async function (req, res, next) {
  try {
    let relativePath = req.url
    let absolutePath = config.root + relativePath;
    absolutePath = decodeURI(absolutePath);
    if (!fs.existsSync(absolutePath)) {
      return next(createError(404));
    }
    console.log(betterUrlJoin('/web/thomas', 'var'))
    let fileStat = fs.lstatSync(absolutePath);
    let isDir = fileStat.isDirectory();
    if (isDir) {
      let files = [];
      const dir = await fs.opendirSync(absolutePath);
      for await (const dirent of dir) {
        files.push({
          name: dirent.name,
          path: betterUrlJoin('/b', relativePath, dirent.name),
          isdir: dirent.isDirectory(),
        });
      }

      let histories = [{ label: "/", href: "/b" }];
      if (relativePath) {
        
        let relativePathSplited = relativePath.split("/");
        for (let path of relativePathSplited) {
          if (!path) continue;

          let hrefTillHere = histories[histories.length-1].href;
          histories.push({ label: path, href: betterUrlJoin(hrefTillHere, path)});
        }
      }

      return res.render("list", { files, histories });
    } else {
      const lookup = mime.lookup(absolutePath);
      const contentType = mime.contentType(lookup);
      console.log(contentType);
      res.writeHead(200, {
        "Content-Type": contentType,
        "Content-Length": fileStat.size,
      });

      const readStream = fs.createReadStream(absolutePath);
      readStream.pipe(res);
    }
  } catch (err) {
    return next(err, req, res);
  }
});

module.exports = router;

function betterUrlJoin(...args) {
  try{
    let url = '';
    args.forEach(arg => {
      url += '/' + arg
    })
    url = url.replace(/\/+/ig, '/')
    return url;
  } catch (err) {
    throw err;
  }
}