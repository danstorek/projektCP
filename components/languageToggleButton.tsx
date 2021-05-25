import languageContext from './language';

const ToggleLanguageButton = () => {
  return (
    <languageContext.Consumer>
      {({language, toggleLanguage}) => (
        <button onClick={toggleLanguage}>
          {language === "en" && "Change language"}
          {language === "cz" && "Změnit jazyk"}
        </button>
      )}
    </languageContext.Consumer>
  );
}

export default ToggleLanguageButton;