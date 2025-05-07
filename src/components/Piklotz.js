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

  const letterNew = `הקולגה הנצחית שלי לדפידבק ♥, סתם אבל לא יכולתי שלא לכתוב לך פקלוץ אחרי התקופה המטורפת הזו, לפני שנה נכנסת למדור ואני לא חושב שיכולת להיכנס אליו בצורה טובה יותר, את פשוט כובשת, מגיעה לכל מקום עם החיוך והאור שלך ופשוט מדביקה אלייך אנשים, כיף להיות בסביבתך, לצחוק איתך, וגם לפעמים לדבר איתך שיחות עמוקות יותר, כי את תמיד תקשיבי ותתני את התחושה שאכפת לך גם אם הכי באלך ללכת למעונות אחרי יום ארוך.
מעבר לתפקיד שלך שאני חושב שעשית אותו פשוט בצורה מופלאה, ושנתת את כל כולך ואת הלב שלך למקום הזה, אז חשוב לי יותר להדגיש את מי שאת כי זה ימשיך איתך גם לתפקידים הבאים, שגם אותם את תעשי בצורה מופלאה, אני בטוח. אני מודה על זה שיצא לי להכיר חברה כמוך בשנה האחרונה, מודה על זה שיצא לנו לעבוד הרבה ביחד, ואני מחכה כבר לשמוע איך לך בתפקיד החדש ומקווה שנוכל לשמור על קשר.
אני באמת אוהב המון, את מיוחדת איוש מקווה שאת יודעת את זה!!!
ניבי`;

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
