import React from 'react';

const languageContext = React.createContext({
    language:"en",
    toggleLanguage: ()=>{},
});

export default languageContext;