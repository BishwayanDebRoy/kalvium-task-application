import React, { useState } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor';
import LanguageSelector from './components/LanguageSelector';

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const runCode = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language: selectedLanguage }),
      });
      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <h1>Online Code Compiler</h1>
      <div className="language-selector">
        <LanguageSelector selectedLanguage={selectedLanguage} onSelectLanguage={setSelectedLanguage} />
      </div>
      <div className="code-editor">
        <CodeEditor code={code} onChangeCode={setCode} />
      </div>
      <button className="button" onClick={runCode}>Run Code</button>
      {output && <div className="output">{output}</div>}
    </div>
  );
}

export default App;
