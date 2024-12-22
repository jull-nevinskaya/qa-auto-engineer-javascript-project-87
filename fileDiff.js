const fileDiff = (obj1, obj2) => {
  let resObj = {};

  for (const [key, value] of Object.entries(obj1)) {
    if (key in obj2) {
      if (obj1[key] === obj2[key]) {
        resObj[' ' + key] = value;
      } else {
        resObj['- ' + key] = value;
        resObj['+ ' + key] = obj2[key];
      }
    } else {
      resObj['- ' + key] = value;
    }
  }

  for (const [key, value] of Object.entries(obj2)) {
    if (key in obj1) {
      continue;
    } else {
      resObj['- ' + key] = value;
    }
  }
  return resObj;
}
module.exports = fileDiff;

// let obj1 =  {
//   host: 'hexlet.io',
//   timeout: 50,
//   proxy: '123.234.53.22',
//   follow: false
// };
//
// let obj2 = { timeout: 20, verbose: true, host: 'hexlet.io' };
//
// console.log(fileDiff(obj1, obj2));
