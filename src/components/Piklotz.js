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

  const letterNew = `בהתחלה לא ידעתי אם אני בכלל אעשה לך פקלוץ, אבל הדייט האחרון שלנו בגלידה פיצוץ הזכיר לי איזה בן אדם את, אבל לפני שאני אתחיל לשפוך פה את הלב על הבן אדם שאת, אני אתחיל בלהמשיך את סוף השיחה שלנו בדייט שדיברנו על בסמח, בסוף המקום הזה לא משנה איך תסובבי אותו, יתן לך כפול 100 ממה שאת נותנת לו, בין אם זה האנשים, הפיתוח האישי, ההתמודדות עם האתגרים, ופיתוח הפקודים שיהיו לך, לא תאמיני כמה מנופחת מגאווה עצמית את יכולה להיות מעצם היותך כאן מתמודדת עם המקום הזה שנקרא בסמח.
דיברנו על זה שהמקום הזה הוא כמו פלסטלינה שאת יכולה לעצב איך שרק תרצי - וזה אומר דבר אחד: תחלמי, תהיי יצירתית, תמצאי את מה שעושה לך טוב, ותזיזי הצידה את מה שלא, תביאי את הטאץ האישי שלך, אל תפחדי להיות לא פוליטיקלי קורקט! אל תפחדי להיות זאת שקוראים לה צ'אחלה רק כי היא היחידה שמסוגלת להגיד את האמת הקשה, תשתמשי בכלים וביכולות שלך, וזה השלב שאני מתחיל לדבר על הבן אדם שאת, את בן אדם כל כך חכם, יש לך נפש טהורה, את חברת אמת! לא חושב שיש מישהו שלא נהנה בסביבתך, אני זכיתי להכיר אותך, את כל הצדדים שלך, ואני יכול להגיד בלב שלם שכל מי שיכיר אותך ויכנס לך לחיים ישמח בדיוק כמו שכל אחד ואחד שבחיים שלך שמח. תמשיכי להיות בדיוק מי שאת, אל תשתני לרגע, אני אוהב וכבר מתגעגע, ניבי ♥`

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
