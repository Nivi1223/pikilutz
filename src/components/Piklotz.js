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

  const letterNew = `וואלה אני באמת חושב שאת אס אמיתי, בתחילת הסגל שראיתי שאנחנו ביחד שמחתי ועם הזמן רק המשכתי לגלות עוד כמה את חדה, חכמה, ביקורתית כלפי הדברים שקורים סביבך, ואני באמת הרגשתי שיש לנו לפעמים עוד עוגן בסגל שתמיד תיתן את הקונטרה בין אם זה בבוניזם או בין אם זה בדיונים סוערים בישיבות סגל ושפשוט יהיה תמיד נעים להקשיב לה ולשמוע את מה שיש לה להגיד.
מעבר לכך אני חושב שזכיתי בחברה טובה לאורך הסגל, היה תמיד כיף לשבת איתך או לשחק איתך כדורסל או לרוץ איתך באמצע היום ולעשות איתך צחוקים.
אני תופס ממך לחלוטין, ואני בטוח שעוד המון אנשים במדור הזה חושבים כמוני. 
אני רוצה לאחל לך שבשנה הקרובה תגיעי לשיאים חדשים ותכבשי עוד פסגות כי את באמת תותחית, אוהב מלא וכבר מתגעגע - ניבי ♥`

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
