import styled from "styled-components";

export const Title = styled.h1`
    color: #BF4F74;
    font-size: 2em;
    font-family: 'Courier New', Courier, monospace;
    margin-bottom: 0.5em;
    margin-top: 0;
    padding: 0.25em 1em ;
    border: 2px solid #BF4F74;
    border-radius: 3px;
`;

export const Description = styled.p`
    top: 6em;
    text-shadow: #1a1a1a 1px 1px 1px;
     font-style: italic;
       `;

export const SubTitle = styled.h2`
    color: #BF4F74;
    font-size: 1.5em;
    margin-top: 0.5em;
    font-family: 'Courier New', Courier, monospace;
    text-shadow: 1px 1px 1px rgba(0, 0, 0.2, 0.2);
`

export const PokemonCard = styled.li`
  background: #1a1a1a;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0.2, 0.2);
  padding: 1em;
  margin: 1em 0;
  max-width: 250px;
    cursor: pointer;
    font-family: 'Courier New', Courier, monospace;
    //me lo tiro chat esto, no sabia como hacerle el hover
    &:hover {
        background: #BF4F74;
        color: #fff;
        box-shadow: 0 4px 16px rgba(0,0,0,0.3);
    }
`;


export const PokemonType = styled.li`
    position: relative;
       justify-self: center;
       margin-right: 0.5em;
    &::before { //Le pedi a chat porq no sabia como ponerle el circulito antes del tipo
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
           margin-left: -0.9em;
        transform: translateY(-50%);
        width: 0.7em;
        height: 0.7em;
        border-radius: 50%;
        background: #213547;
        display: inline-block;
    }
`
export const PageNumber = styled.p`
    background: #213547;
    border-radius: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0.2, 0.2);
    padding: 1em;
    margin: 1em 0.3em;
    max-width: 80px;
    min-width: 30px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 15px;`

export const ProfileSubTitle = styled(SubTitle)`
position: absolute;
       top: 1em;
`;

export const WhiteP = styled.p`
       color: #ffffff;
       font-weight: bold;
       justify-self: left;
`;