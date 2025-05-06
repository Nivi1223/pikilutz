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

  const letterNew = `אם אני אצטרך לתאר אותך במילה אחת אני חושב שהמילה הזו הייתה חץ, והסיבה לכך היא כל כך פשוטה, אבל גם כל כך לא מובנת מאליה, אז אני אגיד מה הסיבה שלי להגדרה הזו, אם נלך 5 חודשים אחורה, בשובועת הראשונים שלך במדור, נכנסת לי ללב פשוט כמו חץ, הרגשתי שמצאתי מישהי שמדברת בשפה שלי, שאני יכול להיות איתה הכי דוגרי בעלם, מישהי שיכולה להבין את הסלנג שלי ולמה אני כועס או שמח, זו הסיבה שלי ללמה את חץ בשבילי, ובשביל אחרים? זה כבר יותר פשוט, לכל מקום שאת מגיעה אליו אי אפשר שלא לפספס את החדות שלך, את כל כך רגישה ומבינה את הסיטואציות סביבך כמו חץ - מכוונת ופוגעת.
אז עכשיו שהגיע הזמן שלי לעזוב, מגיעה לך תודה ענקית, תודה על זה שנכנסת לנו לסגל כמו החץ שאת, תודה שהפכת לחברה שאני תמיד יכול לסמוך עליה.
אני חושב שאת הולכת להיות מפקדת מטורפת, החניכים שלך הולכים פשוט לאהוב אותך, אי אפשר שלא. רותי, את מיוחדת ומי שלא רואה את זה הוא טיפש, אני כבר מתגעגע ומקווה שאני לא בוכה בזמן שאני מקריא לך את זה, אוהב מלא, ניבי`

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
