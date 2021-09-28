import React, { useContext, useState} from 'react'
import AuthContext from '../Contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import firebase from '../Helpers/firebase'
import { useHistory } from 'react-router'
import styled from "styled-components"
import Cards from '../Components/Cards'

//  Styles
const DashBoard = styled.div`

`
const MainTitle = styled.h2`

`
const BlogContext = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-start;
`

export const Home = () => {
    const context = useContext(AuthContext)
    const history = useHistory()

    const [cardData, setCardData] = useState([
        {
            id: 1,
            postedBy: {name: "This Guy Knows Whats up", email: "thisguyknowswhatsup@gmail.com",
            pic: "https://www.askideas.com/media/40/Horse-Funny-Teeth-Smiley-Face-Photo-For-Whatsapp.jpg",},
            title: "New money bug in GTA V",
            description: "Rockstar has once again failed, or maybe made us happy by introducing a new money bug which they will surely fix in a few months. In that timeline here is what you have to do",
            likes: 216,
            postPic: "https://i.ytimg.com/vi/biOVaww3vKI/maxresdefault.jpg",
            comments: [
                {
                    id: 1,
                    postedBy: "ProGamer of Worlds" ,
                    likes: 41,
                    context: "I'm done! That's my breaking point. Them allowing such a bug is simply unacceptable. I will leave this game after 6 years of playing. Goodbye GTA fans. And to hell with you rockstar!",
                },
                {
                    id: 2,
                    postedBy: "TheOnlineChaos" ,
                    likes: 8,
                    context: "Are we even surprised at this point?"
                },
                {
                    id: 3,
                    postedBy: "Alobama",
                    likes: 27,
                    context: "Another bug hardcore fans will abuse to destroy my cars in multiplayer worlds with one lazor shot."
                },
            ]
        },
        {
            id: 2,
            postedBy: {name: "Termentu Ela", email: "termentuela@gmail.com",
            pic: "https://i.kym-cdn.com/entries/icons/original/000/002/361/maxresdefault.jpg"},
            title: "Why amogus is the sussets of all",
            description: "The first thing that comes to mind is the susubbus of these world dolore repellat impedit earum veniam, iusto dolorem consequuntur libero! Quas, voluptatem, officia sequi tenetur dolores mollitia ipsum, totam excepturi iusto reprehenderit delectus alias non vero.",
            likes: 87,
            postPic: "https://pbs.twimg.com/profile_images/1364276861476478989/B26E_nX0_400x400.png",
            comments: [
                {
                    id: 1,
                    postedBy: "amogusFan" ,
                    likes: 2,
                    context: "I knew the amogus was real and was sussing the world like that."
                },
                {
                    id: 2,
                    postedBy: "ThePoggerGuy" ,
                    likes: 31,
                    context: "But do you have any proof that amogus is that sus. I mean this is inhumane."
                },
                {
                    id: 3,
                    postedBy: "BruhTastic33",
                    likes: 74,
                    context: "SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS SUS.",
                },
            ]
        },
        {
            id: 3,
            postedBy: {name:"CJ Master", email: "kksj@gmail.com",
            pic: "http://i.imgur.com/JO3CB9q.jpg",},
            title: "New technology leaps in this year",
            description: "This years new technologies include Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam dolore repellat impedit earum veniam, iusto dolorem consequuntur libero! Quas, voluptatem, officia sequi tenetur dolores mollitia ipsum, totam excepturi iusto reprehenderit delectus alias non vero.",
            likes: 45,
            postPic: "https://www.wehorse.com/en/blog/wp-content/uploads/2019/12/horse-walk-field.png",
            comments: [
                {
                    id: 1,
                    postedBy: "hasanulkelem" ,
                    likes: 12,
                    context: "Lorem ipsum dolor sit amet consectetur adipisicing."
                },
                {
                    id: 2,
                    postedBy: "Keremul" ,
                    likes: 3,
                    context: "Lorem iasdpsum dasdasolor sdsfit amet consectetur adipisicingyxcy."
                },
                {
                    id: 3,
                    postedBy: "Johnny4255",
                    likes: 6,
                    context: "This is so epic i cannot believe what i just read."
                },
            ]
        },
    ])


    return (
        <DashBoard>
            <MainTitle>Dashboard</MainTitle>
            <BlogContext>
                {cardData.map((card, key)=>{
                    return(<Cards card={card} key={key}/>)
                })}
            </BlogContext>
            <ToastContainer containerId="HomeToastContainer"/>

        </DashBoard>
    )
}
