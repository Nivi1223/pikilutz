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

  const letterNew = `יורשת העצר הרשמית, אני לא חושב שהופתעתי יותר מדי לגלות כמה את משימתית ויודעת איך לעשות את העבודה בצורה טובה, נראלי עוד הבנתי את זה בזמן שהיית חניכה ותמיד היו לך את הבעיות הכי מונפצות או בזמן שניסית לפתח ודווקא לך היו את הדברים והבאגים הכי הזויים בעולם אבל בכל זאת תמיד הצלחת לפתור אותם ולפתח ברמה גבוהה.
מעבר למפקדת ולאשת סגל שאת אני חושב שיצא לי להכיר את הבן אדם הכי מצחיק שיש, את סמויה בקטע הכי טוב ותמיד כיף לצחוק איתך על שטויות ולצעוק על אנשים "אתה גנב!!" , בקיצור - תענוג להיות בסביבה שלך.
אני בטוח שתיקחי את המערכת למקומות מטורפים, ושתהיי רשצית טובה רצח, אני תופס ממך מלא ומצפה לשמוע ממך עוד, אוהב - ניבי♥`

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
