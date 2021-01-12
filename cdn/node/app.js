const app = require('express')();
const server = require('http').Server(app);
const path = require('path')
const serveStatic = require('serve-static');
const gifFrames = require('gif-frames');

app.get("/emojis/:emojiname", (req, res, next) => {
    if (!req.query) return next()
    const type = req.query.type;
    if (!type) return next()
    const emojiname = req.params.emojiname;
    const dir = path.join(__dirname, "..", "emojis_dir", emojiname);
    res.set('Cache-Control', 'public, max-age=31536000');
    res.set('Accept-Ranges', 'bytes');
    res.header("Content-Type", "image/png");
    gifFrames({ url: dir, frames: 0, outputType: 'png' }).then(function (frameData) {
      frameData[0].getImage().pipe(res)
    }).catch(_ => {next()})
})

app.use("/emojis", serveStatic(path.join(__dirname, "..", "emojis_dir"), {
  maxAge: '1d',
  setHeaders: headerControl
}))

app.get("/:userid/:fileid/:filename", (req, res, next) => {
    if (!req.query) return next()
    const type = req.query.type;
    if (!type) return next()
    const userid = req.params.userid;
    const fileid = req.params.fileid;
    const filename = req.params.filename;
    const dir = path.join(__dirname, "..", "files", userid, fileid, filename);
    res.set('Cache-Control', 'public, max-age=31536000');
    res.set('Accept-Ranges', 'bytes');
    res.header("Content-Type", "image/png");
    gifFrames({ url: dir, frames: 0, outputType: 'png' }).then(function (frameData) {
      frameData[0].getImage().pipe(res)
    }).catch(_ => {next()})
})

app.use(serveStatic(path.join(__dirname, "..", "files"), {
  maxAge: '1d',
  setHeaders: headerControl
}))


function headerControl (res, p) {
  if (!serveStatic.mime.lookup(p).startsWith('image')) {
    res.setHeader('Content-disposition', 'attachment; filename=' + path.basename(p));
    
} else {
      res.set('Cache-Control', 'public, max-age=31536000');
  }
}

app.all("/*", (res, req) => {
    req.status(404).send("Invalid Image.")
})

server.listen(process.env.VUE_APP_CDN_PORT);