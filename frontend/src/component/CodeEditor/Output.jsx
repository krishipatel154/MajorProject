import React, { useEffect, useState } from "react";
import { executeCode } from "./api";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h3 className="m-3 text-black dark:text-white text-xl">Output</h3>
      <button
        onClick={runCode}
        className="w-[100px] h-[30px] bg-black text-white rounded-[3px] mb-2 dark:bg-white dark:text-black"
      >
        Run Code
      </button>
      <div
        style={{
          color: isError ? "red" : "yellow",
        }}
        className="dark:text-white"
      >
        {output
          ? output.map((line, i) => <p key={i}>{line}</p>)
          : "Click 'Run Code' to see the output "}
      </div>
    </div>
  );
};

export default Output;
