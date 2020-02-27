const baseURL = 'http://localhost:4000';

async function getAPI (link, callbackSuccess, callbackError) {
  const url = baseURL + link;
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  response.data = await response.json();
  if (response.statusText === 'OK') {
    callbackSuccess(response);
  } else {
    callbackError(response);
  }
}

async function postAPI (link, method, data = {}, callbackSuccess, callbackError) {
  const url = baseURL + link;
  const response = await fetch(url, {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  response.data = await response.json();
  if (response.statusText === 'OK') {
    callbackSuccess(response);
  } else {
    callbackError(response);
  }
}
