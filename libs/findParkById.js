module.exports = findParkById = function(id, parks) {
  return parks.find(function(p) {
    return (p.id == id);
  });
};
