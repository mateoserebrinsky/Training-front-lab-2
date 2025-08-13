import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2em;
`;

export const CenteredContainerForList = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center;
`;

export const ProfileImageContainer = styled.div`
    border-radius: 0;
    border: 2px solid #BF4F74;
    position: absolute;
    top: 5em;
    left: 34em;
`;

export const CenteredContainerForProfileInfo = styled(CenteredContainerForList)`
    flex-direction: column;
    justify-content: right;
    position: absolute;
    top: 5em;
    right: 48%;
    font-family: 'Courier New', Courier, monospace;
    display: flex;
    align-items: flex-start;
`;

export const EvolutionChainContainer = styled.div`
    margin-top: 5em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
`;

export const StatsContainer = styled.div`
border-radius: 0;
    position: absolute;
    padding: 10px;
    top: 4.3em;
    right: 30em;
    font-family: 'Courier New', Courier, monospace;
    
`;
