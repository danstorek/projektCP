import styled from "styled-components"

const SearchBarStyled = styled.input`
    margin-top: 50px;
    font-size: 30px;
    height: 60px;
    width: 400px;
    border-width: 2px;
    border-style: solid;
    border-color: black;
    border-radius: 25px;
    text-align: center;
    outline: transparent;
`

const DarkModeButton = styled.button`
    color:black;
    position: fixed;
    left: 0;
    top: 0;
`

const PageCont = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export { SearchBarStyled, DarkModeButton, PageCont }