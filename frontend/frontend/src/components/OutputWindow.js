// src/components/OutputWindow.js
import React from 'react';

const OutputWindow = ({ output }) => {
    return (
        <div>
            <h3>Output</h3>
            <pre>{output}</pre>
        </div>
    );
};

export default OutputWindow;
