import * as yargs from "yargs";
import axios from "axios";

yargs
    .option('token', {
        alias: 't',
        required: true,
    })
    .option('username', {
        alias: 'u',
        required: true,
    })
    .help()
    .argv;

console.log("Starting!");
axios.post('https://api.github.com/graphql',
    {
        query: `{ user(login: "${yargs.argv.username}") { registryPackagesForQuery(last: 10, query:"is:private") { totalCount nodes { nameWithOwner versions(last: 100) { nodes { id version } } } } }}`
    },
    {
        headers: {
            Accept: 'application/vnd.github.package-deletes-preview+json',
            Authorization: `bearer ${yargs.argv.token}`,
        }
    })
    .then((response) => {
        response.data.data.user.registryPackagesForQuery.nodes.forEach(node => {
            console.log(`${node.nameWithOwner} has ${node.versions.nodes.length} versions`);
            node.versions.nodes.forEach((version, index) => {
                // Do not delete the latest version
                if (index !== 0) {
                    axios.post('https://api.github.com/graphql',
                        {
                            query: `mutation { deletePackageVersion(input:{packageVersionId:"${version.id}"}) { success }}`
                        },
                        {
                            headers: {
                                Accept: 'application/vnd.github.package-deletes-preview+json',
                                Authorization: `bearer ${yargs.argv.token}`,
                            }
                        })
                        .then(response => {
                            console.log(`Deleted version ${version.id}`);
                        })
                        .catch((error) => {
                            console.log(error.response.data.message);
                        });
                }
            })
        });
    })
    .catch((error) => {
        console.log(error.response.data.message);
    });
