import { CardActionArea } from '@material-ui/core';
import React, { useContext } from 'react'
import AuthContext from '../Contexts/AuthContext';
import styled from "styled-components"
import { useHistory } from 'react-router';

// Styles
const CardContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 400px;
  border-radius: 10px;
  padding: 10px 10px;
  margin: 25px 5px;
  box-shadow: 1px 1px 10px 1px gray;
`
const Image = styled.img`
  height: 200px;
  object-fit: cover;
  width: 400px;
`
const BlogPoster = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 5px;
  user-select: none;
  -ms-user-select: none;
`
const ProfielPicImg = styled.img`
  width: 50px;
  object-fit: cover;
  height: 50px;
  margin: 0 15px;
  border-radius: 50%;
`
const ProfileName = styled.h4`
  font-size: 20px;
  margin:  0 15px;
  font-weight: 300;
  font-family: 'Helvetica Neue', sans-serif;
`
const MainContext = styled.div`
  padding: 0 5px;
`
const ContextTitle = styled.h2`
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 20px;
`
const ContextDesc = styled.p`

`

const Cards = ({ card }) => {
  const history = useHistory();
  const context = useContext(AuthContext);

  const ToDetails =()=>{
    context.user? 
    history.push("/details"):
    history.push("/login")
  }

  return (
    <CardContainer>
      <BlogPoster>
        <ProfielPicImg src={card.postedBy.pic} />
        <ProfileName>{card.postedBy.name}</ProfileName>
      </BlogPoster>
      <CardActionArea>
        <Image src={card.postPic} />
        <MainContext onClick={ToDetails}>
          <ContextTitle>{card.title}</ContextTitle>
          <ContextDesc>{card.description.substring(0, 100) + "..."}</ContextDesc>
        </MainContext>
      </CardActionArea>

    </CardContainer>
  )
}
export default Cards;