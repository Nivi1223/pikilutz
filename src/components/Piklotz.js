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

  const letterNew = `אני לא יודע כל כך איך להתחיל לכתוב לך את הפקלוץ, אבל מה שאני כן יודע זה שבחצי שנה האחרונה אתה היית חלק כל כך מרכזי בחיים שלי, ובקטע הכי טוב שאפשר, בחצי השנה האחרונה יצא לי להכיר בין אדם פשוט מיוחד, אתה משוגע על כל הראש אבל מצד שני כל כך רגיש, אתה יכול לצחוק על הדברים הכי לא פוליטיקלי קורקט שיש אבל מצד שני יש לך בגרות וטאקט שלא ראיתי אצל המון אנשים.
אני עוד הבנתי עם מי יש לי עסק במסע של 24A שעשינו צוקים בחאן ושם כבר אמרתי שאני חייב להיות איתך בסגל, אתה עדיין מכחיש ולא זוכר את זה אבל זה זכרון שחרוט לי בראש, ואז בחשיפה עצמה באמת הייתי שמח שיצאנו ביחד, ולרגע לא חשבתי כמה שמח אני אהיה שאני כותב לך את הפקלוץ הזה.
בחצי שנה האחרונה יצא לי להכיר חבר אמת, מישהו שאני יכול לסמוך עליו ולשתף אותו בדברים הכי רגישים שלי, מישהו שאפשר לצחוק לבכות להתעצבן לקלל ולדקלם את אותו הקטע מאותו הסרטון שוב ושוב ושוב בלי שימאס.
בחצי שנה האחרונה הפכתי לאדם יותר שמח וחלק גדול מזה הוא בגללך.
עכשיו אני צריך לעזוב את המקום הזה אבל אני כל כך שמח שהוא נשאר בידיים שלך, אתה עוגן לסגל שלך, אתה חכם ומשימתי, אתה מפוצץ מוטיבציה ואנרגיה, ואתה באמת פשוט לב אחד גדול.
אני כבר מתגעגע וחסר לך שלא נשמור על קשר, אני אוהב אותך על מלא אח שלי - הפידראס הפרטי שלך ♥`

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
