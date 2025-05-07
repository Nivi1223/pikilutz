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

  const letterNew = `לסבא רבא הכי טוב שיכולתי לבקש, לא יודע אם אתה זוכר אבל נראלי מאז שחשפו לנו הורים שיגעתי אותך ותמיד קראתי לך סבא רבא, ושגיליתי בחשיפת סגלים שאתה המקס שלי קיבלתי תחושה של סגירת מעגל פשוט לא נורמלית, וישר קפצנו לסגל, ולא יכולתי להישאר אדיש למי שאתה, איך אתה פשוט היית חלק מאיתנו וירדת לעם תוך פאקינג שניות.
אני באמת חושב שאתה מקצוען אמיתי, אתה משימתי ופרקטי, האהבה שלך לתפקיד כל כך מורגשת ומוקרנת החוצה לאנשים שחווים אותך, ואני יכול להגיד בלב שלם שאנשים מעריצים אותך.
אתה יוצא עכשיו לאזרחות ואני חושב שכל מקום שתגיע אליו יזכה בבן אדם שאתה, מעבר למקצוע, מעבר לתכנות, נמצא בן אדם עם לב פאקינג ענק, אתה באמת מיוחד. אוהב ומתגעגע, ניבי`

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
        <Front
          isCardFlipped={isCardFlipped}
          isLogoPressed={isLogoPressed}
          isPhonePressed={isPhonePressed}
          logoPress={logoPress}
          phonePress={phonePress}
        />
        <Back setIsCardFlipped={setIsCardFlipped} personData={personData} />
      </div>
    </div>
  );
};

export default Piklotz;
