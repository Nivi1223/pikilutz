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

  const letterNew = `שמע אחי איזה כיף שהגעתי לרגע הזה שאני יכול לדבר איתך אחד על אחד על כל השנה האחרונה ולהגיד לך כמה אני מעריך אותך. נכנסת לפה בסערה וישר הפגנת נוכחות בכל מקום שהיית בו, אתה בן אדם דומיננטי, חברותי, רגיש רצח וחכם. אני פשוט נהנ לראות אותך מפקד, על איך שאתה מתייחס ואוהב חניכים, ועל הערך שאתה מביא לסגל, אתה כולך צבע ענק שמכניס גוונים מיוחדים לחדר שאתה נמצא בו, ואני מקווה שאתה יודע את זה.
עכשיו אתה נמצא בנקודה הכי משמעותית שלך בבסמח, אתה הולך לקבל ילד, יש לך סגל ראשון מדהים שמעריץ אותך, ואתה בעמדה של עיצוב הדמות הפיקודית שלך ברמה הגבוה ביותר, אני יודע שאתה תעשה את זה הכי טוב כי אתה באמת תותח.
אני אוהב אותך מלא אחשלי, אני אתגעגע ומצפה לשמוע ממך עוד. ניבי ♥`

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
