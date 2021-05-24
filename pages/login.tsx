import styles from '../styles/Home.module.css'
import Head from 'next/head';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useContext, useState } from 'react';
import Link from 'next/link';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "../components/firebaseconnect";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

import { getDarkMode, useDarkMode, isLogged } from "../components/functions"

import languageContext from "../components/language";

type Errors = {
  email?: any;
  password?: any;
};

if (isLogged()) {
  firebase.auth().signOut();
}

const Page = () => {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(styles.ok);
  const [submitting, setSubmitting] = useState(false);

  const langContext = useContext(languageContext);

  const [dark, setDark] = useState(styles.mainwhite);
  useDarkMode(setDark);

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossOrigin="anonymous" />
      </Head>
      <main className={dark}>
        <button className={styles.buttontoggle} onClick={() => { setDark(getDarkMode()); }}>Dark Mode</button>
        <h1 className={styles.title}>
          {
            langContext.language === "cz" && "Přihlášení"
          }
          {
            langContext.language === "en" && "Login"
          }
        </h1><br></br>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={values => {
            const errors: Errors = {};
            setMsg("");
            //Email errors
            if (!values.email) {
              errors.email = <p className={styles.error}>
                {
                  langContext.language === "cz" && "Vyžadovaná položka"
                }
                {
                  langContext.language === "en" && "Required item"
                }
              </p>;
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = <p className={styles.error}>
                {
                  langContext.language === "cz" && "Neplatný email"
                }
                {
                  langContext.language === "en" && "Invalid email"
                }
              </p>;
            }

            //Password errors
            if (!values.password) {
              errors.password = <p className={styles.error}>
                {
                  langContext.language === "cz" && "Vyžadovaná položka"
                }
                {
                  langContext.language === "en" && "Required item"
                }
              </p>;
            }

            return errors;
          }}
          onSubmit={(values) => {
            setTimeout(() => {
              firebase.auth().signInWithEmailAndPassword(values.email, values.password)
                .then(() => {
                  // Signed in
                  if (langContext.language === "cz") setMsg("Byl jsi úspěšně přihlášen");
                  else if (langContext.language === "en") setMsg("You were successfully logged in");
                  setSubmitting(true);
                  setError(styles.ok);
                  // ...
                })
                .catch(() => {
                  if (langContext.language === "cz") setMsg("Prosím překontroluj své údaje");
                  else if (langContext.language === "en") setMsg("Please check your credentials");
                  setError(styles.error);
                });
            }, 400);
          }}
        >
          {() => (
            <Form>
              <h2 className={styles.title2}>Email</h2>
              <Field disabled={submitting} type="email" name="email" />
              <ErrorMessage name="email" component="div" />
              <h2 className={styles.title2}>
                {
                  langContext.language === "cz" && "Heslo"
                }
                {
                  langContext.language === "en" && "Password"
                }
              </h2>
              <Field disabled={submitting} type="password" name="password" />
              <ErrorMessage name="password" component="div" /><br />
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {
                  langContext.language === "cz" && "Přihlásit se"
                }
                {
                  langContext.language === "en" && "Login"
                }
              </button>
              {
                langContext.language === "cz" && <Link href="./register">Zaregistrovat se</Link>
              }
              {
                langContext.language === "en" && <Link href="./register">Register</Link>
              }
            </Form>
          )}
        </Formik>
        <p className={error}>{msg}</p>
        {
          langContext.language === "cz" && <Link href="./main">Zpět na hlavní stránku</Link>
        }
        {
          langContext.language === "en" && <Link href="./main">Back to the main page</Link>
        }
      </main>
    </div>
  )
}

export default Page;