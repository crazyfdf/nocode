function escape2Html(str) {
  var arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"', '#x27': '"' };
  return str.replace(/&(lt|gt|nbsp|amp|quot|#x27);/gi, function (all, t) {
    return arrEntities[t];
  });
}

export default JSON.parse(escape2Html('{}'));
