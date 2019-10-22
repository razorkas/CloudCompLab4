const express = require('express');
const router = express.Router();
const parser = require('xml2json');
const path = require('path');

const fs = require('fs');

// Validation input logic
const validateToXMLData = require('../../validation/toxmldata');

const createFilePath = filename => {
  return path.join(__dirname, '..', '..', 'shared', 'datasets', filename);
};

const readXMLFile = filepath => {
  const data = fs.readFileSync(filepath, 'utf8');
  const json = JSON.parse(parser.toJson(data, { reversible: true }));

  return json;
};

const writeXMLFile = (filename, data) => {
  var stringData = JSON.stringify(data);
  const xml = parser.toXml(stringData);
  fs.writeFileSync(filename, xml);
  return data;
};

const isUnique = (dataset, propName, field) => {
  return dataset.filter(item => item[propName] === field).length === 0;
};

const datasetfile = createFilePath('dataset.xml');

// @route   GET api/lab3/test
// @desc    Tests xml parser
router.get('/test', (req, res) => {
  /* WORKS WITH JSON DATA FILE
  fs.readFile(filepath, function(err, data) {
    const jsonData = JSON.parse(data);

    res.json({
      msg: 'lab3 Works',
      xmlfile: jsonData ? jsonData : 'undefined'
    });
  });
  */
  const xmldata = readXMLFile(datasetfile);
  // servplacedata = readXMLFile(servplacefile);
  // virtservdata = readXMLFile(virtservfile);
  // physservdata = readXMLFile(physservfile);

  /**  WORK LOGIC FOR HEADERS FETCHING
  let headers = [];
  for (let key in virthostdata.dataset.record[0]) {
    headers.push(`${key}: ${virthostdata.dataset.record[0][key]}`);
  }
  */

  res.json({
    data: xmldata ? xmldata : 'have no data',
    names: xml.dataset.record.map(item => item.name), // WORKS FOR RAWS FETCHING
    headers: headers
  });

  // res.json({
  //   msg: 'lab3 Works',
  //   virthost: virthostdata ? virthostdata : 'have no data',
  //   servplace: servplacedata ? servplacedata : 'have no data',
  //   virtserv: virtservdata ? virtservdata : 'have no data',
  //   physserv: physservdata ? physservdata : 'have no data'
  // });
});

// @route   GET api/lab3/dataset
// @desc    Get all datasets via xml files
router.get('/', (req, res) => {
  const xmldata = readXMLFile(datasetfile);

  res.json({
    data: xmldata ? xmldata.dataset.record : 'have no data'
  });
});

// @route POST api/lab3/dataset
// @desc Writes new record to virtual hosting data file
router.post('/dataset', (req, res) => {
  const { errors, isValid } = validateToXMLData(req.body);
  const xmldata = readXMLFile(datasetfile);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  if (!isUnique(xmldata.dataset.record, 'name', req.body.name)) {
    return res
      .status(400)
      .json({ alreadyexists: 'Record with such name already exists' });
  }

  const newRecord = {
    name: req.body.name,
    monthprice: req.body.monthprice,
    yearprice: req.body.yearprice,
    ssdcapacity: req.body.ssdcapacity,
    sites: req.body.sites,
    mysqldbs: req.body.mysqldbs,
    ramlimit: req.body.ramlimit,
    cpulimit: req.body.cpulimit,
    freedomain: req.body.freedomain,
    freessl: req.body.freessl,
    siteconstr: req.body.siteconstr,
    scrinstall: req.body.scrinstall,
    hostplace: req.body.hostplace,
    freetest: req.body.freetest
  };

  xmldata.dataset.record.unshift(newRecord);

  res.json(writeXMLFile(datasetfile, xmldata));
});

// @route   DELETE api/lab3/dataset/:name
// @desc    Remove record from virtual hosting data file
router.delete('/dataset/:name', (req, res) => {
  const name = req.params.name;

  const xmldata = readXMLFile(datasetfile);

  if (xmldata.dataset.record.filter(item => item.name === name).length === 0) {
    return res.status(404).json({ recordnotexists: 'Record does not exist' });
  }

  const removeIndex = xmldata.dataset.record
    .map(item => item.name)
    .indexOf(name);

  xmldata.dataset.record.splice(removeIndex, 1);

  res.json(writeXMLFile(datasetfile, xmldata));
});

module.exports = router;
