export function get(yourUrl) {

  var Httpreq = new XMLHttpRequest();
  Httpreq.open("GET", yourUrl, false);
  Httpreq.send(null);

  return Httpreq.responseText;

}