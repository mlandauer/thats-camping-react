// Using old school syntax so that I can use it in transform_data.js
// without having to figure out how to do it properly

var shortenName = module.exports = function(name) {
  return name.replace("campground and picnic area", "")
    .replace("large group campground", "")
    .replace("campgrounds", "")
    .replace("campground", "")
    .replace("camping grounds", "")
    .replace("camping ground", "")
    .replace("picnic and camping area", "")
    .replace("camping and picnic area", "")
    .replace("Camping Area", "")
    .replace("camping area", "")
    .replace("rest area", "")
    .replace("tourist park", "")
    .trim()
}
