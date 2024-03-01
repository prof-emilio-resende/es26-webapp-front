function createXmlHttpRequest() {
  var request = null;
  try {
    request = new XMLHttpRequest();
  } catch (e) {
    console.log(JSON.stringify(e));
  }

  return request;
}

function prepareXmlHttpRequest(request, onReadyStateChangeCallback) {
  if (request == null) return;
  request.onreadystatechange = buildHandleXmlHttpResponse(onReadyStateChangeCallback);
  request.open("POST", "http://localhost:3000/imc/calculate");
  request.setRequestHeader("Content-Type", "application/json");
}

function sendXmlHttpRequest(request, payload) {
  request.send(JSON.stringify(payload));
}

function buildHandleXmlHttpResponse(callback) {
  return function () {
    console.log("handleXmlHttpResponse...");
    if (this.readyState === 4) {
      console.log(this);
      callback(JSON.parse(this.responseText));
    }
  };
}

var req = createXmlHttpRequest();
console.log("xmlHttpRequest criado...");
console.log(req);

prepareXmlHttpRequest(req, function (r) {
  console.log("imprimindo resposta...");
  console.log(r);
});
sendXmlHttpRequest(req, {
  height: 1.9,
  weight: 88,
  imc: "24.38",
  imcDescription: "normal",
});
