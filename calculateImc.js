function createXmlHttpRequest() {
    var request = null;
    try {
        request = new XMLHttpRequest();
    } catch(e) {
        console.log(JSON.stringify(e));
    }

    return request;
}

function prepareXmlHttpRequest(request) {
    if (request == null) return;
    request.onreadystatechange = buildHandleXmlHttpResponse(function(r) {
        console.log('imprimindo resposta...');
        console.log(r);
    });
    request.open('POST', 'http://localhost:3000/imc/calculate');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send();
}

function buildHandleXmlHttpResponse(callback) {
    return function() {
        console.log('handleXmlHttpResponse...');
        if (this.readyState === 4) {
            console.log(this);
            callback(this.responseText);
        }
    }
}

var req = createXmlHttpRequest();
console.log('xmlHttpRequest criado...');
console.log(req);

prepareXmlHttpRequest(req);


