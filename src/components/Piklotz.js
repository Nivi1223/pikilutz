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

  const letterNew = `הייתי פותח את הפקלוץ הזה באיזה משפט שנון או ציני אבל כנראה שהיית נותן לי מבט מאוכזב או סתם צוחק עליי, כי שנינו יודעים שאתה הכי טוב בזה, וזה ישר מעלה לי לראש את זה שאתה פשוט באמת הכי מצחיק, לא חושב שהייתה לי אינטרקציה אחת איתך שלא נגמרה בצחוק או בזה שאני מבסוט עליך במקסימום.
אבל צחוק בצד (תרתי משמע), יש לך באמת מקום בלב שלי, כי מעבר לדמות הקורעת שאתה יש בן אדם סופר בוגר שאפשר פשוט לדבר איתו על הכל, ולהרגיש שיש מי שעומד להקשיב לך לא משנה מה, וזה סופר מוערך. 
אני חושב שאתה הולך להיות הורה מצוין, וסגל שני חזק שיש המון מה ללמוד ממנו.
תמשיך לתת בראש, אני בטוח שאתה תפציץ ותהיה מטורף, אוהב מלא - ניבי ♥`

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
