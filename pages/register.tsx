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

import { getDarkMode, useDarkMode } from "../components/functions";

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
        <h1 className={styles.title}>
          {
            langContext.language === "cz" && "Registrace"
          }
          {
            langContext.language === "en" && "Registration"
          }
        </h1><br></br>
        <Formik
          initialValues={{ email: '', password: '', password2: '', username: '' }}
          validate={values => {
            const errors: Errors = {};

            //username errors
            if (!values.username) {
              errors.username = <p className={styles.error}>
                {
                  langContext.language === "cz" && "Vyžadovaná položka"
                }
                {
                  langContext.language === "en" && "Required item"
                }
              </p>;
            } else if (
              !/^[a-z0-9_-]{3,15}$/i.test(values.username)
            ) {
              errors.username = <p className={styles.error}>
                {
                  langContext.language === "cz" && "Neplatné uživatelské jméno"
                }
                {
                  langContext.language === "en" && "Invalid username"
                }
              </p>;
            }

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
            else if (values.password.length > 15) {
              errors.password = <p className={styles.error}>
                {
                  langContext.language === "cz" && "Heslo musí mít méně než 15 znaků"
                }
                {
                  langContext.language === "en" && "Password must have less than 15 chars"
                }</p>;
            }
            else if (values.password.length < 6) {
              errors.password = <p className={styles.error}>
                {
                  langContext.language === "cz" && "Heslo musí mít více než 6 znaků"
                }
                {
                  langContext.language === "en" && "Password must have more than 6 chars"
                }
              </p>;
            }

            //Password2 errors
            if (!values.password2) {
              errors.password2 = <p className={styles.error}>
                {
                  langContext.language === "cz" && "Vyžadovaná položka"
                }
                {
                  langContext.language === "en" && "Required item"
                }
              </p>;
            }
            else if (values.password != values.password2) {
              errors.password2 = <p className={styles.error}>
                {
                  langContext.language === "cz" && "Hesla se neshodují"
                }
                {
                  langContext.language === "en" && "Passwords do not match"
                }
              </p>;
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
                  if (langContext.language === "cz") setMsg("Byl jsi úspěšně zaregistrován.");
                  else if (langContext.language === "en") setMsg("You were successfully registered.");
                  setError(styles.ok);
                  // ...
                })
                .catch(() => {
                  if (langContext.language === "cz") setMsg("Zkontroluj prosím své údaje.");
                  else if (langContext.language === "en") setMsg("Please check your credentials.");
                  setError(styles.error);
                });
            }, 400);
          }}
        >
          {() => (
            <Form>
              <h2 className={styles.title2}>
                {
                  langContext.language === "cz" && "Uživatelské jméno"
                }
                {
                  langContext.language === "en" && "Username"
                }
              </h2>
              <Field disabled={submitting} type="text" name="username" />
              <ErrorMessage name="username" component="div" />
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
              <ErrorMessage name="password" component="div" />
              <h2 className={styles.title2}>
                {
                  langContext.language === "cz" && "Heslo pro ověření"
                }
                {
                  langContext.language === "en" && "Password for verification"
                }
              </h2>
              <Field disabled={submitting} type="password" name="password2" />
              <ErrorMessage name="password2" component="div" /><br></br>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {
                  langContext.language === "cz" && "Zaregistrovat se"
                }
                {
                  langContext.language === "en" && "Register"
                }
              </button>
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