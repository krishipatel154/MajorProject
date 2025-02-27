import React, { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "./languages";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <div className="flex gap-2">
      <div style={{ width: "60%" }}>
        <LanguageSelector language={language} onSelect={onSelect} />
        <Editor
          theme="vs-dark"
          height="75vh"
          language={language}
          defaultValue={CODE_SNIPPETS[language]}
          value={value}
          onChange={(value) => setValue(value)}
          onMount={onMount}
        />
      </div>
      <div>
        <Output editorRef={editorRef} language={language} />
      </div>
    </div>
  );
};

export default CodeEditor;
