const axios = require('axios');

// Make a request for a user with a given ID
axios.post('https://api.github.com/graphql',
    {
        "query": "{ user(login: \"dubemarcantoine\") { registryPackagesForQuery(last: 10, query:\"is:private\") { totalCount nodes { nameWithOwner versions(last: 100) { nodes { id version } } } } }}"
    },
    {
        headers: {
            Accept: 'application/vnd.github.package-deletes-preview+json',
            Authorization: 'bearer '
        }
    })
    .then(function (response) {
        // handle success
        console.log(response.data.data.user.registryPackagesForQuery.nodes);
    })
    .catch(function (error) {
        // handle error
        console.log(error.response.data.message);
    });
