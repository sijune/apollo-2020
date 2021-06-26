import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

const GET_MOVIE = gql`
  # Apollo를 위한 코드: 변수 체크
  query getMovie($id: Int!) {
    # Query를 위한 코드
    movie(id: $id) {
      id
      title
      language
      rating
      medium_cover_image
      description_intro
      isLiked @client
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const TextColumn = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const ImageColumn = styled.div`
  width: 40%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 70%;
  height: 100%;
  background-color: transparent;
  background-size: cover;
  background-image: url(${(props) => props.bg});
  background-position: center;
  margin-bottom: 10px;
  border-radius: 7px;
`;

const Suggestions = styled.div`
  width: 100%;
  display: flex;
  height: 40%;
`;
const Suggestion = styled.div`
  width: 25%;
  height: 100%;
  background-color: transparent;
  background-size: cover;
  background-image: url(${(props) => props.bg});
  background-position: center;
  margin-left: 5px;
  border-radius: 7px;
`;

const Detail = () => {
  // 변수 설정
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) },
  });
  console.log(data);

  //화면 설정
  return (
    <Container>
      <TextColumn>
        <Title>
          {loading
            ? "Loading..."
            : `${data.movie.title} ${data.movie.isLiked ? "😀" : "❤️"}`}
        </Title>
        <Subtitle>
          {data?.movie?.language}·{data?.movie?.rating}
        </Subtitle>
        <Description>{data?.movie?.description_intro}</Description>
      </TextColumn>
      <ImageColumn>
        <Poster bg={data?.movie?.medium_cover_image} />
        <Suggestions>
          {data?.suggestions.map((s) => (
            <Suggestion bg={s.medium_cover_image} />
          ))}
        </Suggestions>
      </ImageColumn>
    </Container>
  );
};
export default Detail;
