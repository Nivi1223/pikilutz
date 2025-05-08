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

  const letterNew = `לקאפי היקר מכל, לא יצא לנו כמעט להכיר בכלל לפני הסגל הזה, והאמת אני ממש שמחתי לגלות שאתה איתי באותו הסגל, ומרתי שאני ארצה שנהיה קאפים כדי שאפילו נתחבר יותר, ואני שמח שכן יצא לנו להתחבר בסגל הזה, אני אמרתי לך את זה עוד בקלע אמצע ואני אומר לך את זה שוב - אתה שם את הלב על הדברים שחשובים לך, ואתה פועל במוטיבציה כל כך גבוהה וחשוב לך להפוך את המקום שאתה נמצא בו למקום טוב יותר, אתה ביקורתי, חד, חכם ובוגר, וכיף תמיד לדבר איתך ולדון בכל נושא ולשמוע את דעתך, גם אם היא נגמרת בקיר עם חור באמצע.
אני חושב שזה היופי בך, אתה אותנטי ולא שם מסכות כדי שאנשים אחרים יאהבו אותך, אתה מי שאתה ומי שלא טוב לו שילך, ואני מאוד אוהב את הגישה הזו.
אני אתגעגע לשיחות איתך, ולהשתגע ביחד מבשרים איכותיים ואז למנגל אותם כמו שני אבות עם כרס.
אוהב אותך מלא, בטוח שאתה הולך להיות סגמצ מטורף וליהנות מסיום התקופה שלך פה, אני מודה על כך שהיית חלק מהתקופה שלי פה, ניבי♥`

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
