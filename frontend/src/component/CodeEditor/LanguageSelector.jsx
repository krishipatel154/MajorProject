import React from "react";
import { LANGUAGE_VERSION } from "./languages";

// const languages = Object.entries(LANGUAGE_VERSION);

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <div>
      <select
        className="block w-[95%] px-4 py-2 bg-gray-200 text-gray-900 dark:text-white dark:bg-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 m-4"
        name=""
        id=""
        value={language}
        onChange={(e) => onSelect(e.target.value)}
      >
        {Object.entries(LANGUAGE_VERSION).map(([key, value]) => (
          <option key={key} value={key}>
            {key}-{value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
