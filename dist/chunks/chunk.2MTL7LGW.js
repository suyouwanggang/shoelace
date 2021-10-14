// src/internal/date.util.ts
var castDate = (d) => {
  const date = d === void 0 ? void 0 : new Date(d);
  return date;
};
var isValidDate = (date) => {
  return date && date instanceof Date && !isNaN(date.getTime());
};
var getDateYearMonthDay = (d) => {
  const date = d instanceof Date ? d : new Date(d ? d : +new Date());
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day];
};
var parseDate = (dateString, type = "date") => {
  const [year, month, day] = getDateYearMonthDay(dateString);
  let value = "";
  switch (type) {
    case "date":
      value = year + "-" + (month + "").padStart(2, "0") + "-" + (day + "").padStart(2, "0");
      break;
    case "month":
      value = year + "-" + (month + "").padStart(2, "0");
      break;
    default:
      value = year + "";
      break;
  }
  return value;
};
var getDaysPanel = (year, month = 1) => {
  const date = new Date(year, month - 1, 1);
  const week = date.getDay();
  date.setDate(date.getDate() - week);
  const array = [];
  let i = 0;
  while (i < 35) {
    array.push(new Date(+date));
    date.setDate(date.getDate() + 1);
    i++;
  }
  return array;
};
var isEqualsDate = (d1, d2, mode = "date") => {
  return d2 ? parseDate(d1, mode) == parseDate(d2, mode) : false;
};

export {
  castDate,
  isValidDate,
  parseDate,
  getDaysPanel,
  isEqualsDate
};
