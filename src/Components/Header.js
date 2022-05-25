import styled from "styled-components";

export default function Header(){
    return(
        <HeaderStyle>
            <h1>TrackIt</h1>
            <img src="https://i.pinimg.com/736x/18/d3/44/18d34446c12fa107a116fed730cbc95d.jpg" alt="foto de perfil"/>
        </HeaderStyle>
    )
}

const HeaderStyle = styled.div`
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 70px;
    background-color: var(--cor-header);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    h1{
        font-family: 'Playball', cursive;
        color: var(--cor-branca);
        font-size: 39px;
    }

    img{
        width: 51px;
        height: 51px;
        border-radius: 60px;
        border: 1px solid var(--cor-branca);
        object-fit: cover;
    }
`