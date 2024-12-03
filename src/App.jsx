import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numberallowed, setNumberAllowed] = useState(false);
  const [charallowed, setCharAllowed] = useState(false);
  const [password, setpassword] = useState("");
  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    // Ensure the text field is selectable
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0, password.length);
    document.execCommand('copy');
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallowed) str += "0123456789";
    if (charallowed) str += "!@#$%^&*()-_=+[]{}|;,.<>?/:'`~*";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numberallowed, charallowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberallowed, charallowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-600 bg-slate-800">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex-shadow flex rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            ref={passwordRef}
            readOnly
          />
          <button
            className="outline-none bg-blue-400 text-white px-3 py-0.5 shrink-0 active:bg-white active:text-black"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setlength(Number(e.target.value))}
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numberallowed}
              id="numberInput"
              onChange={() => setNumberAllowed(prev => !prev)}
            />
            <label>Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={charallowed}
              id="charInput"
              onChange={() => setCharAllowed(prev => !prev)}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
