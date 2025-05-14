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

  const letterNew = `איזה כיף שיש לי את הזכות לכתוב לך את הפקלוץ הזה, ועוד יותר כיף שיצא לנו להיות ביחד במדור הזה כל כך הרבה זמן, בשנה וחצי האחרונות יצא לי להכיר מישהי פשוט מיוחדת, מהרגע הראשון שלך פה במדור פשוט המסת כאן את כולם וישר נהיית בורג מרכזי כאן במדור, לא אחד ולא שניים אלא המון אנשים פה במדור פשוט מעריצים אותך ואני מקווה שאת יודעת את זה, אני גם נמצא שם בשורת האוהדים ודואג להזכיר לך את זה שאנחנו אומרים שלום אחד לשניה עם פרצופים סימנים וחיבוקים הזויים בצורה הכי מוזרה שיש ואין כיף ומצחיק מזה. 
אני באמת יודע ומאמין בלב שלם שאת הולכת להיות סגמצ שהוא עוגן לסגל שלו, ואני כל כך מחכה לשמוע איך עובר הסגל ובכללי לשמוע ממך עוד כי אני אתגעגע מלאא
נשאר לי לאחל לך רק בהצלחה, תמשיכי להיות באמת הכי טובה בכל מה שאת עושה, ותמשיכי לעשות את זה עם חיוך ואהבה, אוהב מלא - ניבי`

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
