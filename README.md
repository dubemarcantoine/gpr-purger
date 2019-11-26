curl -X POST \
-H "Accept: application/vnd.github.packages-preview+json" \
-H "Authorization: bearer 84bc05dec6015ed0c497498ab1060d1dc426915d" \
-d '{"query":"{ user(login: \"dubemarcantoine\") { registryPackagesForQuery(last: 10, query:\"is:private\") { totalCount nodes { nameWithOwner versions(last: 100) { nodes { id version } } } } }}"}' \
https://api.github.com/graphql


curl -X POST \
-H "Accept: application/vnd.github.package-deletes-preview+json" \
-H "Authorization: bearer 84bc05dec6015ed0c497498ab1060d1dc426915d" \
-d '{"query":"mutation { deletePackageVersion(input:{packageVersionId:\"MDE0OlBhY2thZ2VWZXJzaW9uMjYxNjE1==\"}) { success }}"}' \
https://api.github.com/graphql

# GPR Purger
Purge repositories in Github Package Registry.

## Usage
`./gpr-purger-linux --token=<yourtoken> --username=<username>`

## Development
### Run
1. `npm i`
2. `npm run dev -- --token=<yourtoken> --username=<username>`

### Build
1. `npm run build`
