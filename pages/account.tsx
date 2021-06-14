import { Menu } from '../components/menu';
import {DarkModeButton, PageCont} from '../components/styledComps'
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import firebase from "../components/firebaseconnect";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import React, { useContext, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import {isLogged, getDarkMode, useDarkMode, getLanguageText} from "../components/functions";

import languageContext from "../components/language";

type Errors = {
  username?: any;
};

const About = () => {
  const [username, setUsername] = useState("");
  const [msg, setMsg] = useState("");
  if (isLogged()) {
    firebase.firestore().collection("users").doc(firebase.auth().currentUser?.uid).get().then(doc => {
      setUsername((doc.data()||"")['username']);
    });
  }

  const langContext = useContext(languageContext);

  const lng = getLanguageText(langContext.language);

  const [dark, setDark] = useState(styles.mainwhite);
  useDarkMode(setDark);

  return (
    <PageCont>
      <Head>
        <title>{lng?.['app.accsettings']}</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossOrigin="anonymous" />
      </Head>
      <Menu />
      <main className={dark}>
        <DarkModeButton onClick={() => {setDark(getDarkMode());}}>Dark Mode</DarkModeButton>
        <h1 className={"display-1 " + styles.title}>{lng?.['app.accsettings']+" "+username}</h1>
        <h2 style={{ marginTop: "50px" }}>{lng?.['app.usrnamechange']}</h2>

        <Formik
          initialValues={{ username: '' }}
          validate={values => {
            const errors: Errors = {};

            //username errors
            if (!values.username) {
              errors.username = <p className={styles.error}>{lng?.['app.requireditem']}</p>;
            } else if (
              !/^[a-z0-9_-]{3,15}$/i.test(values.username)
            ) {
              errors.username = <p className={styles.error}>{lng?.['app.invaliditem']}</p>;
            }
            console.log(errors);
            return errors;
          }}
          onSubmit={(values) => {
            setTimeout(() => {
              const db = firebase.firestore().collection("users").doc(firebase.auth().currentUser?.uid);
              return db.update({
                username: values.username
              })
                .then(() => {
                  setMsg(lng?.['app.editsuccess'] || "");
                  setUsername(values.username);
                })
                .catch(() => {
                  setMsg("error");
                })
            }, 400);
          }}
        >
          {() => (
            <Form>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="div" /><br></br>
              <button type="submit" className="btn btn-primary">{lng?.['app.save']}</button>
            </Form>
          )}
        </Formik>
        <p className={styles.ok}>{msg}</p>

      </main>
    </PageCont>
  )
}
export default About
