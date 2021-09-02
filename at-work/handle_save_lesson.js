var express = require('express');
var router = express.Router();

const fse = require('fs-extra');
const path = require('path');

const JSONdb = require('simple-json-db');

/* GET listing. */
router.get('/', function(request, response, next) {
  response.send('respond for get '+Date.now().toISOString());
});

const apiInfo = "/api/";
router.get(apiInfo, async (req, res) => {
  console.log('get handled ' + apiInfo)
  const result = { type: "get", time: new Date().toISOString() };
  return res.json(result);
});

// router.post('/', function(request, response){
//   console.log(request.body);      // your JSON
//   response.send(request.body);    // echo the result back
// });

router.post("/", async (req, res) => {
  //console.log('post handled', req.body, req.params, req.headers)

  const lessons = req.body.lessons
  const epName = req.body.file
  const orginalFile = process.env.AT_WORK_EP_DIR + epName + '.json'
  const timestamp = new Date().toISOString().substr(0, 19).replace('T', '_').replace(':', '').replace(':', '')
  //console.log('timestamp ' + timestamp)
  const backupFile = process.env.AT_WORK_BACKUP_DIR + epName + '_' + timestamp + '.json'
  try {
    fse.copySync(orginalFile, backupFile)
  } catch (err) {
    console.error('Error while creating backup file (copy ' + orginalFile + ' -> ' + backupFile+')', err)
  }
  try {
    await fse.writeFile(orginalFile, JSON.stringify(lessons, null, 4));
    console.log('success write ' + epName)
  } catch (err) {
    console.error('Error while writing ', err)
  }

  const result = { type: "post", time: new Date().toISOString() };
  return res.json(result);
});

const przerobioneEndpoint = "/przerobione/"
router.post(przerobioneEndpoint, async (req, res) => {
  console.log('post handled ' + przerobioneEndpoint, req.body)
  const zgloszoneZdarzenie = req.body
  const db = new JSONdb(process.env.AT_WORK_SIMPLE_JSON_DB);
  const key = 'key_' + zgloszoneZdarzenie.ep + '_' + zgloszoneZdarzenie.index
  db.set(key, zgloszoneZdarzenie);

  const result = { type: "post", time: new Date().toISOString() };
  return res.json(result);
});

module.exports = router;
