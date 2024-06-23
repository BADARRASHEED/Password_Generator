import { useState, useCallback, useEffect, useRef } from "react";

function Password() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copyButtonText, setCopyButtonText] = useState("Copy");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += " !#$%&()*+,-./:;<=>?@[]^_`{|}~''";

    for (let i = 1; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);

    setCopyButtonText("Copied ✓");

    setTimeout(() => {
      setCopyButtonText("Copy");
    }, 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="bg-[#0C2D57] h-screen grid place-items-center">
        <div className="w-full max-w-4xl mx-auto shadow-md shadow-[#FC6736] p-7 text-[#FC6736] rounded-lg bg-[#EFECEC]">
          <h1 className="text-4xl text-center mb-12 font-semibold underline">
            Badar&#39;s Password Generator
          </h1>
          <div className="flex rounded-lg overflow-hidden">
            <input
              type="text"
              className="w-full outline-none py-3 px-3 focus:text-[#EEEEEE] focus:font-semibold"
              value={password}
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPassword}
              className="outline-none bg-[#FC6736] text-white px-5 py-0.5 w-32 font-semibold"
            >
              {copyButtonText}
            </button>
          </div>
          <div className="flex text-sm gap-x-2 mt-5 p-5">
            <div className="flex items-center gap-x-1 w-96">
              <input
                type="range"
                min={8}
                max={100}
                value={length}
                className="cursor-pointer range [--range-shdw:#FC6736]"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label className="w-32 px-2">Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                className="checkbox border-[#FC6736] checked:border-[#FC6736] [--chkbg:#FC6736] [--chkfg:#EFECEC]"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                className="checkbox border-[#FC6736] checked:border-[#FC6736] [--chkbg:#FC6736] [--chkfg:#EFECEC]"
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Password;
