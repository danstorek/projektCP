import languageContext from './language';

function ToggleLanguageButton() {
  // The Theme Toggler Button receives not only the theme
  // but also a toggleTheme function from the context
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