import { useState, useCallback, useEffect, useRef } from "react";


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordInput = useRef(null);

  //useCallback hook
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "`~!@#$%^&(){}[]_|;:<>,.?'/*-+";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordInput.current?.select();
    passwordInput.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  //useEffect hook
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <div className="bg-gray-700 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-5 rounded shadow">
        <div className="text-green-500">
          <h1 className="text-2xl font-bold p-2 text-center">Password Generator</h1>
          <div className="flex items-center justify-center">
            <input
              className="w-4/5 p-2  border rounded "
              type="text"
              value={password}
              placeholder="password"
              readOnly
              ref={passwordInput}
            />
            <button
              onClick={copyPasswordToClipboard}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Copy
            </button>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row p-2 items-center justify-center">
            <div className=" flex flex-col sm:flex-row p-2 items-center justify-center ">
              <input
                type="range"
                min={8}
                max={100}
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
                className=""
              />
              <label className="text-gray-700 ml-3">Length:{length}</label>
            </div>


            <div className="m-1">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
                className="mr-1"
              />
              <label htmlFor="numberInput" className="text-gray-700">
                Numbers
              </label>
            </div>

            <div className="m-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
                className="mr-1"
              />
              <label htmlFor="characterInput" className="text-gray-700">
                Character
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;