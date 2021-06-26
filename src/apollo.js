import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
    // resolver를 통해 캐시에 필드를 넣을 수 있다.
    resolvers: {
        //초기값 세팅, Detail 페이지에 처음 접근 시 무조건 false로 지정될 수 밖에 없다.
        Movie: {
            isLiked: () => false,
        },
        //값을 바꾸기 위한 Mutation
        Mutation: {
            toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
                cache.modify({
                    id: `Movie:${id}`,
                    fields: {
                        isLiked: (isLike) => !isLiked,
                    },
                });
            },
        },
    },
});

export default client;