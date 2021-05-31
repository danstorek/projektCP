import { AppProps } from 'next/app'
import '../styles/globals.css'
import languageContext from "../components/language"
import { useState } from 'react';

const App = ({ Component, pageProps }: AppProps) => {
  const [lang, setLang] = useState("en");
  const toggleLang = () => {
    if(lang == "en") {
      setLang("cz");
    }
    else {
      setLang("en");
    }
  }
  return (
    <languageContext.Provider value={{language: lang, toggleLanguage: toggleLang}}>
      <Component {...pageProps} />
    </languageContext.Provider>
  )
}

export default App;