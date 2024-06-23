const moment = require("moment");

module.exports = {
  format_date: (date) => {
    return moment(date).format("MM/DD/YYYY");
  },
  equals: (arg1, arg2) => {
    return arg1 === arg2;
  }
};
