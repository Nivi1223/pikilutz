import React, { useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import "../index.css";
import CryptoJS from "crypto-js";
import { useLocalStorage } from "usehooks-ts";
import letters from "../letters.json";
import Front from "./Front";
import Back from "./Back";

const Piklotz = () => {
  const { person } = useParams();
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isPhonePressed, setIsPhonePressed] = useLocalStorage(
    "isPhonePressed",
    false
  );
  const [isLogoPressed, setIsLogoPressed] = useLocalStorage(
    "isLogoPressed",
    false
  );

  const letterNew = `וואלה אחי שתדע אני תופס ממך מלא, נכנסת אלינו לסגל בסערה וישר הבנתי שיש פה עסק עם מישהו תותח, אתה חכם, ביקורתי, עושה את המשימות שלך בצורה טובה ויוזם דברים נדירים עבור הסגל (מרים לך רצח על השיר).
אז בגדול אני מקווה שאתה יודע מה את השווה, אני מקנא בך ומאחל לך פה שנתיים נדירות, תהנה מכל רגע, תיצור לעצמף את החוויות, ותמשיך להיות בדיוק מי שאתה, אוהב מלא - ניבי`

  const encrypt = CryptoJS.AES.encrypt(
    letterNew,
    process.env.REACT_APP_SECRET
  ).toString();

  console.log(encrypt);
  const decryptLetter = useCallback((encryptedLetter) => {
    const decryptedLetterBytes = CryptoJS.AES.decrypt(
      encryptedLetter,
      process.env.REACT_APP_SECRET
    );

    return decryptedLetterBytes.toString(CryptoJS.enc.Utf8);
  }, []);

  const personData = useMemo(() => {
    const data = letters[person];

    return { ...data, letter: decryptLetter(data.letter) };
  }, [person, decryptLetter]);

  const phonePress = () => {
    setIsPhonePressed(true);
  };

  const logoPress = () => {
    setIsLogoPressed(true);
    setIsCardFlipped(true);
  };

  return (
    <div className={`container ${isCardFlipped ? "flip" : ""}`}>
      <div className="card">
        <Front logoPress={logoPress} phonePress={phonePress} />
        <Back setIsCardFlipped={setIsCardFlipped} personData={personData} />
      </div>
    </div>
  );
};

export default Piklotz;
