const rp = require('request-promise-native');

const OPTIONS = {
  uri: 'https://xkcd.com/info.0.json',
  json: true
}

module.exports = (req, res) => {
  rp(OPTIONS).then(data => {
    res.send(data);
  });
};
