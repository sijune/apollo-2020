import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_MOVIE = gql`
  # Apollo를 위한 코드: 변수 체크
  query getMovie($id: Int!) {
    # Query를 위한 코드
    movie(id: $id) {
      title
      language
      rating
      medium_cover_image
      description_intro
    }
  }
`;

const Detail = () => {
  //
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) },
  });

  if (!loading) {
    return <h1>{data.movie.title}</h1>;
  }
  return <h1>Detail</h1>;
};
export default Detail;
