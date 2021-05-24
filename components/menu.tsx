import Link from 'next/link'
import React, { FC, useContext, useState } from 'react'
import styled from 'styled-components'
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "./firebaseconnect";

import {isLogged} from "../components/functions";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

import ToggleLanguageButton from './languageToggleButton';

import languageContext from "../components/language";

const NavBreak = styled.div`
  width: 100px;
  height: 1px;
`;

const NavBar = styled.nav`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

export const Menu: FC = () => {
  const [logged, setLogged] = useState(isLogged());

  const langContext = useContext(languageContext);

  const logout = () => {
    firebase.auth().signOut();
    setLogged(false);
    location.reload(true);
  }

  return (<NavBar className="navbar navbar-expand-lg navbar-dark bg-dark" style={{width: "100%"}}>
    <a className="navbar-brand" href="#">Menu</a>
    <ToggleLanguageButton></ToggleLanguageButton>
    <NavBreak></NavBreak>
    <div>
      <ul className="navbar-nav">
        <li className="nav-item"><Link href="../main" passHref><a className="nav-link">
        {
          langContext.language === "cz" && "Seznam pokémonů"
        }
        {
          langContext.language === "en" && "Pokemon list"
        }</a></Link></li>
        <li className="nav-item"><Link href="../favorite" passHref><a className="nav-link">
        {
          langContext.language === "cz" && "Oblíbení pokémoni"
        }
        {
          langContext.language === "en" && "Favorite pokemons"
        }</a></Link></li>
        <li className="nav-item"><Link href="../about" passHref><a className="nav-link">
        {
          langContext.language === "cz" && "O nás"
        }
        {
          langContext.language === "en" && "About us"
        }</a></Link></li>
      </ul>
    </div>
    <NavBreak></NavBreak>
    <div>
        {
          !logged &&
          <ul className="navbar-nav"><li className="nav-item"><Link href="../login" passHref><a className="nav-link">
            {
          langContext.language === "cz" && "Přihlásit se"
        }
        {
          langContext.language === "en" && "Login"
        }</a></Link></li></ul>
        }
        {
          logged &&
          <ul className="navbar-nav"><li className="nav-item"><Link href="../account" passHref><a className="nav-link">{firebase.auth().currentUser?.email}</a></Link></li><li className="nav-item"><button className="logout" onClick={logout}>
          {
          langContext.language === "cz" && "Odhlásit se"
        }
        {
          langContext.language === "en" && "Log out"
        }</button></li></ul>
        }
    </div>
  </NavBar>
  )
}