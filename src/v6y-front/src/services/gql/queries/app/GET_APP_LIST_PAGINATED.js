import { gql } from 'graphql-request';

const GET_APP_LIST_PAGINATED = gql`
    query getAppListByPageAndParams(
        $offset: Int
        $limit: Int
        $keywords: [String]
        $searchText: String
    ) {
        getAppListByPageAndParams(
            offset: $offset
            limit: $limit
            keywords: $keywords
            searchText: $searchText
        ) {
            _id
            name
            description
            repo {
                _id
                name
                fullName
                owner
                webUrl
                gitUrl
                allBranches
            }
            links {
                _id
                type
                label
                value
                description
            }
            keywords {
                _id
                type
                branch
                label
                color
                helpMessage
            }
        }
    }
`;

export default GET_APP_LIST_PAGINATED;
