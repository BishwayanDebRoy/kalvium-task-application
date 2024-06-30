import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';

const CodeEditor = ({ code, onChangeCode }) => (
    <div className="code-editor">
        <CodeMirror
            value={code}
            options={{
                mode: 'javascript',
                theme: 'material',
                lineNumbers: true,
            }}
            onBeforeChange={(editor, data, value) => {
                onChangeCode(value);
            }}
        />
    </div>
);

export default CodeEditor;
