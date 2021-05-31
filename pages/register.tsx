import styles from '../styles/Home.module.css'
import Head from 'next/head';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "../components/firebaseconnect";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import React, { useContext, useState } from 'react';

import { getDarkMode, getLanguageText, useDarkMode } from "../components/functions";

import languageContext from "../components/language";

type Errors = {
  username?: any;
  email?: any;
  password?: any;
  password2?: any;
};

const Page = () => {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(styles.ok);
  const [submitting, setSubmitting] = useState(false);

  const langContext = useContext(languageContext);

  const lng = getLanguageText(langContext.language);

  const [dark, setDark] = useState(styles.mainwhite);
  useDarkMode(setDark);

  return (
    <div className={styles.container}>
      <Head>
        <title>Registration</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossOrigin="anonymous" />
      </Head>
      <main className={dark}>
        <button className={styles.buttontoggle} onClick={() => { setDark(getDarkMode()); }}>Dark Mode</button>
        <h1 className={styles.title}>{lng?.['app.register']}</h1><br></br>
        <Formik
          initialValues={{ email: '', password: '', password2: '', username: '' }}
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

            //Email errors
            if (!values.email) {
              errors.email = <p className={styles.error}>{lng?.['app.requireditem']}</p>;
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = <p className={styles.error}>{lng?.['app.invaliditem']}</p>;
            }

            //Password errors
            if (!values.password) {
              errors.password = <p className={styles.error}>{lng?.['app.requireditem']}</p>;
            }
            else if (values.password.length > 15) {
              errors.password = <p className={styles.error}>{lng?.['app.passwordlong']}</p>;
            }
            else if (values.password.length < 6) {
              errors.password = <p className={styles.error}>{lng?.['app.passwordshort']}</p>;
            }

            //Password2 errors
            if (!values.password2) {
              errors.password2 = <p className={styles.error}>{lng?.['app.requireditem']}</p>;
            }
            else if (values.password != values.password2) {
              errors.password2 = <p className={styles.error}>{lng?.['app.passdonotmatch']}</p>;
            }

            console.log(errors);
            return errors;

          }}
          onSubmit={(values) => {
            setTimeout(() => {
              firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
                .then((userCredential) => {
                  // Signed in 
                  const user = userCredential.user;
                  firebase.firestore().collection("users").doc(user?.uid).set({
                    username: values.username,
                    favorite: [],
                  });
                  setSubmitting(true);
                  setMsg(lng?.['app.registered'] || "");
                  setError(styles.ok);
                  // ...
                })
                .catch(() => {
                  setMsg(lng?.['app.loginerror'] || "");
                  setError(styles.error);
                });
            }, 400);
          }}
        >
          {() => (
            <Form>
              <h2 className={styles.title2}>{lng?.['app.username']}</h2>
              <Field disabled={submitting} type="text" name="username" />
              <ErrorMessage name="username" component="div" />
              <h2 className={styles.title2}>Email</h2>
              <Field disabled={submitting} type="email" name="email" />
              <ErrorMessage name="email" component="div" />
              <h2 className={styles.title2}>{lng?.['app.password']}</h2>
              <Field disabled={submitting} type="password" name="password" />
              <ErrorMessage name="password" component="div" />
              <h2 className={styles.title2}>{lng?.['app.passwordverify']}</h2>
              <Field disabled={submitting} type="password" name="password2" />
              <ErrorMessage name="password2" component="div" /><br></br>
              <button type="submit" className="btn btn-primary" disabled={submitting}>{lng?.['app.register']}</button>
            </Form>
          )}
        </Formik>
        <p className={error}>{msg}</p>
        <Link href="./main">{lng?.['app.clickheretogetback']}</Link>
      </main>
    </div>
  )
}

export default Page;