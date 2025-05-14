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

  const letterNew = `אני אתחיל את הקפוץ ואגיד שהרגע שבו שמעתי שאת איתנו בסגל קפצתי על נגה משמחה כי וואלה באמת רציתי לעבוד איתך, יש לזה המון סיבות אבל אני אתן את הטאצ' האישי שלי. דבר ראשון - את אור. את נקודת אור קטנה וקופצנית שפשוט יודעת תמיד לעשות שמח סביבה ולהרים את האנשים גם שהם עצובים, אני באמת חושב שעשית אותי הרבה יותר שמח בחצי השני של הסגל.
הדבר השני - נתינה. את כולך לב, את נותנת מעצמך לפני שאת נותנת לעצמך, את תורמת, מתנדבת, יוזמת ועוזרת לסגל, שזה סופר נדיר.
הדבר האחרון -  חברות. אני חושב שיש בך חברותיות שאין להרבה אנשים. את מצחיקה קלילה וזורמת על כל שטות שיש, תמיד כיף לבוא ולדבר איתך ותמיד לדעת שיש גם מקום לשיחות יותר עמוקות או משמעותיות, ואז ישר לאחר מכן לחזור לצחוק על דברים דבילים או סתם לרקוד מלא בחדס
אז בגדול, אני חושב שאת באמת בן אדם מיוחד, המדור בידיים יותר טובות בזכותך, אתגעגע מלא ואוהב מלא- ניבי ♥`

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
