import "./App.css";
import { useState } from "react";

function App() {
  const [languages, setLanguages] = useState([
    {
      name: "C",
      code: "c",
    },
    {
      name: "Java",
      code: "java",
    },
    {
      name: "Python 3",
      code: "python3",
    },
    {
      name: "Javascript",
      code: "javascript",
    },
  ]);

  const [programData, setProgramData] = useState({
    language: "c",
  });

  const handleProgram = (e) => {
    setProgramData((state) => ({ ...state, source_code: e.target.value }));
  };

  const handleLanguage = (e) => {
    e.preventDefault();
    languages.map((language) => {
      if (language.code === e.target.value) {
        setProgramData((state) => ({ ...state, language: e.target.value }));
        return 1;
      }
      return 0;
    });
  };

  const handleStdin = (e) => {
    setProgramData((state) => ({ ...state, stdin: e.target.value }));
  };

  const [output, setOutput] = useState({});

  const handleOutput = async () => {
    await fetch(
      `http://api.paiza.io:80/runners/create?source_code=${
        programData.source_code
      }&language=${programData.language}${
        programData.stdin ? `&input=${programData.stdin}` : ""
      }&api_key=guest`,
      {
        method: "POST",
        headers: {
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "max-age=0, private, must-revalidate",
          Connection: "keep-alive",
          "Content-Length": "59",
          "Content-Type": "application/json; charset=utf-8",
          Date: "Sat, 20 Mar 2021 14:25:31 GMT",
          Etag: 'W/"fc231a66f34f39a6331da1313a1c6d7c"',
          "Referrer-Policy": "strict-origin-when-cross-origin",
          Server: "nginx/1.17.10 (Ubuntu)",
          "X-Content-Type-Options": "nosniff",
          "X-Download-Options": "noopen",
          "X-Frame-Options": "SAMEORIGIN",
          "X-Permitted-Cross-Domain-Policies": "none",
          "X-Request-Id": "a4d0c349-ebf7-4394-9644-dba4155e4bd2",
          "X-Runtime": "0.080531",
          "X-Xss-Protection": "1; mode=block",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setProgramData((state) => ({ ...state, id: data.id })))
      .catch((e) => console.log(e.message));
    proceed();
  };

  const proceed = async () => {
    console.log(programData.id);

    await fetch(
      `http://api.paiza.io:80/runners/get_details?id=${programData.id}&api_key=guest`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "max-age=0, private, must-revalidate",
          Connection: "keep-alive",
          "Content-Length": "59",
          "Content-Type": "application/json; charset=utf-8",
          Date: "Sat, 20 Mar 2021 14:25:31 GMT",
          Etag: 'W/"fc231a66f34f39a6331da1313a1c6d7c"',
          "Referrer-Policy": "strict-origin-when-cross-origin",
          Server: "nginx/1.17.10 (Ubuntu)",
          "X-Content-Type-Options": "nosniff",
          "X-Download-Options": "noopen",
          "X-Frame-Options": "SAMEORIGIN",
          "X-Permitted-Cross-Domain-Policies": "none",
          "X-Request-Id": "a4d0c349-ebf7-4394-9644-dba4155e4bd2",
          "X-Runtime": "0.080531",
          "X-Xss-Protection": "1; mode=block",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setOutput(data))
      .catch((e) => console.log(e.message));
  };

  console.log(output, programData);

  return (
    <div className="app">
      <textarea
        name=""
        id="app__area"
        cols="30"
        rows="10"
        onChange={handleProgram}
      ></textarea>
      <div className="app__function">
        <div className="app__dropdown">
          <label htmlFor="select">Languages</label>
          <select onChange={handleLanguage}>
            {languages.map((language, index) => (
              <option key={index} value={language.code}>
                {language.name}
              </option>
            ))}
          </select>
        </div>
        <button className="app__button" onClick={handleOutput}>
          Run
        </button>
      </div>
      <textarea
        placeholder="stdin"
        name=""
        id=""
        cols="30"
        rows="10"
        onChange={handleStdin}
      ></textarea>
      <p>
        {output.stdout ? output.stdout : output.build_stderr || output.stderr}
      </p>
    </div>
  );
}

export default App;
