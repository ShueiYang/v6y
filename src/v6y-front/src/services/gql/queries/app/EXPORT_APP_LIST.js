import { gql } from 'graphql-request';

const EXPORT_APP_LIST = gql`
    query exportAppList($offset: Int, $limit: Int, $keywords: [String], $searchText: String) {
        exportAppList(
            offset: $offset
            limit: $limit
            keywords: $keywords
            searchText: $searchText
        ) {
            name
            appId
            links {
                type
                label
                value
                description
            }
            keywords {
                type
                branch
                label
                color
            }
            qualityGates {
                label
                branch
                level
                color
                module
            }
            repo {
                fullName
                gitUrl
                name
                owner
                webUrl
            }
        }
    }
`;

export default EXPORT_APP_LIST;
