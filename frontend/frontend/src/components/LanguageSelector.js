import React from 'react';

const LanguageSelector = ({ selectedLanguage, onSelectLanguage }) => (
    <select value={selectedLanguage} onChange={(e) => onSelectLanguage(e.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="C">C</option>
        <option value="Cpp">C++</option>
        <option value="Nodejs">Node.js</option>
        <option value="ruby">Ruby</option>
    </select>
);

export default LanguageSelector;

