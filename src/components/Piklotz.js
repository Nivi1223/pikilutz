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

  const letterNew = `ישר שאני חושב עלייך תמיד עולה לי בראש על הצחוקים שאנחנו עושים ועל איך תמיד אנחנו מצליחים למצוא את הסמיות שלנו בכל מפגש ואינטרקציה אחד עם השניה.
אני רוצה לנצל את ההזדמנות ולהגיד תודה שיצא לי להכיר אותך, אני חושב שאת בן אדם מדהים, ושאני שמח שיצא לנו להיות ביחד עוד בתקופות הראשונות שלנו בבסמח בין אם זה שאני הופעתי ליום וחצי שהיית חניכה או שהיינו ביחד בשט"ו ואת כל השטויות שעשינו שם.
אני מאחל לך באמת את כל ההצלחה שיש בעולם, אני חושב שאת אשת סגל מצוינת, יש לך כל כך הרבה איכויות וצבע שאת מוסיפה לסגל שאת נמצאת בו, ואני מצפה לשמוע ממך איך הולך כי נראה שנפלת טוב בסגל האחרון שלך, אני מת עלייך ואתגעגע - ניבי♥`

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
