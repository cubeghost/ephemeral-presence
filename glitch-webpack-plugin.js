require('dotenv').config();

const { getOptions } = require('loader-utils');


module.exports = function loader(content, map, meta) {
  const options = getOptions(this) || {};
  const projectId = process.env.PROJECT_ID;
  
  console.log('content', content);
  console.log('meta', meta);
  
  const callback = this.async();
  
  callback(null, content);
};