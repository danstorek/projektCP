import React from 'react';

const languageContext = React.createContext({
    language:"en",
    toggleLanguage: ()=>{console.log("empty function")},
});

export default languageContext;