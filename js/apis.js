const baseURL = 'http://localhost:4000';

function getAPI (link) {
  return new Promise((resolve, reject) => {
    fetch(`${baseURL}${link}`, {
      method: 'GET',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(async res => {
        const data = await res.json();
        res.data = data;
        return res;
      })
      .then(res => resolve(res))
      .catch(err => reject(err))
  });
}

function postAPI (link, method, data = {}) {
  return new Promise((resolve, reject) => {
    fetch(`${baseURL}${link}`, {
      method,
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(async res => {
      const data = await res.json();
      res.data = data;
      return res;
    })
    .then(res => resolve(res))
    .catch(err => reject(err))
  });
}
