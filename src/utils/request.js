function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }

  throw new Error(response.statusText);
}

function get(url) {
  return fetch(url).then(handleResponse);
}

function post(url, data) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handleResponse);
}

function update(url, data) {
  return fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handleResponse);
}

function remove(url) {
  return fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then(handleResponse);
}

export { get, post, update, remove };
