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

  const letterNew = `אני חושב שמהתרגול הראשון שעזרתי לך וראיתי אותך כזאת קופצנית ושמחה, כבר שם הבנתי שיש פה מישהי מיוחד וישר עליתי לסגל וצעקתי להם "יש לרומיאו מאותרת שתגיע למדור", וזה היה ברור כשמש שזה מה שיקרה, וטוב בתכלס? זה קרה ובגדול, הגעת למדור הזה ופשוט כבשת את כל הלבבות של האנשים שהיו סביבך, את כולך מלאה באור ובחיוך, עושה כל דבר שנותנים לך באהבה, וגם עושה אותו בצורה הכי טובה שיש, וזה השילוב המנצח של לב טוב עם ראש וטוב, ואת זכית בשניהם.
בנוסף לכל זה אני מרגיש שיצא לי להכיר גם מישהי שאני חד משמעית יכול להגיד שהיא חברת אמת, תיד כיף לבוא ולדבר איתך סתם ככה באמצע היום, שיחות קלילות וגם כבדות, כי תמיד את תקשיבי.
אני מבואס מזה שלא יצא לנו להיות עוד ביחד במדור, אבל שמח שיש כל כך הרבה אנשים שיהנו ממך בשנה וחצי שנשארו לך פה.
אז חיים שלי בלבבב, אני באמת מאחל לך את כל ההצלחה שבעולם,לכי תטרפי את המדור הזה, ניבי♥`

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
