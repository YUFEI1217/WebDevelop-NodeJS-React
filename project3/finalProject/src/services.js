export function fetchLogin(username) {
    return fetch('/api/session', {
      method: 'POST',
      headers:  new Headers({
        'content-type': 'application/json', // set this header when sending JSON in the body of request
    }),
      body: JSON.stringify( { username } ),
    })
    .catch( () => Promise.reject({ error: 'network-error' }) )
    .then( response => {
        if (response.ok) {
          return response.json();
        }
        return response.json()
        .catch( error => Promise.reject({ error }) )
        .then( err => Promise.reject(err) );
    });
};

export function fetchAddCart(production) {
    return fetch('/api/cart', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ production }),
    })
    .catch( () => Promise.reject({ error: 'network-error' }) )
    .then( response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch( error => Promise.reject({ error }) )
        .then( err => Promise.reject(err) );
    });
};

export function fetchClearCart() {
    return fetch('/api/cart', {
        method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch( error => Promise.reject({ error }) )
        .then( err => Promise.reject(err) );
    });
};

export function fetchUpdateCart(productionName, productionUpdate) {
    return fetch(`api/cart/${productionName}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(productionUpdate ),
    })
    .catch( () => Promise.reject({ error: 'network-error' }) )
    .then( response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch( error => Promise.reject({ error }) )
        .then( err => Promise.reject(err) );
    });
};

export function fetchCart() {
    return fetch('/api/cart')
    .catch(() => Promise.reject({ error: 'networkError'}))
    .then( response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch( error => Promise.reject({ error }) )
        .then( err => Promise.reject(err) );
    });
}


  
export function fetchSession() {
    return fetch('/api/session', {
      method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch( error => Promise.reject({ error }) )
        .then( err => Promise.reject(err) );
    });
}
  
export function fetchLogout() {
    return fetch('/api/session', {
      method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch( error => Promise.reject({ error }) )
        .then( err => Promise.reject(err) );
    });
}