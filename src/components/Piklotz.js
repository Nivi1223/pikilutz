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

  const letterNew = `לילדה עם הידיים והרגליים הכי קטנות אבל עם הלב הכי ענק, איזה כיף שיצא לנו להכיר דרך החלטה שבכלל לא תלויה בנו - השיבוץ צעירים חונכים. בהתחלה לא ידעתי למה לצפות כי לא הכרתי אותך אבל מהר מאוד יצא לי להכיר מישהי פשוט מהממת, היה לי כיף לשמוע אותך מהרגע הראשון שלך בסגל, ולהמשיך את הקשר שלנו גם אחרי ופשוט להינות מהתקופה איתך בבסמח, אני באמת חושב ומאמין שאת מפקדת מצוינת, והחניכים האישיים שלך זכו במפקדת מיוחדת. אני חושב שהאהבה שאת מוסיפה לכל דבר שאת עושה רק עושה את אותו הדבר מיוחד יותר, כי זו מי שאת וזה החותם שאת משאירה בכל מקום שאת נמצאת.
אני אתגעגע מלא ומצפה לשמוע ממך עוד מלא, אוהב - ניבי ♥`

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
