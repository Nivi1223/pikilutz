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

  const letterNew = `איזה כיף שיצא לי להכיר אותך, ברגע ששמעתי שאת איתנו בסגל, לא הכרתי אותך כל כך אבל הייתה לי תחושת בטן טובה, שובצת גם בדפידבק וגם שם, הייתי שמח, ועכשיו אחרי כמעט 5 חודשים מאז שיצא לי להכיר אותך, אני באמת מבין למה הייתי שמח! את פאקינג בוס, שאקלית אמיתית, כל כך כיף בחברתך, יש לך את הסיפורים הכי מצחיקים, את הכי זורמת על שטויות ולשיר איתי הטוב הרע ואודיה סתם ככה באמצע היום.
אני בטוח שאת הולכת להיות מפקדת פשוט טובה, כי את טובה במה שאת עושה, אני שמח שיצא לי לראות את זה בתקופת הסגל, ועצוב שיצא לי לראות את זה קצת מדי.
כבר מתגעגע, ואיך קובי אמר? "Mamba Out" ♥`

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
