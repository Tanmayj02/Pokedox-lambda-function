const Models = require("./Schema");
const apiConstants = require("./ApiConstants");

module.exports = {
  ...Models,
  ...apiConstants
};