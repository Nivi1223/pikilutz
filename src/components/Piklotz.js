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

  const letterNew = `שפיכי סמיכי נעימי חמימי בכל הגרון, אולי זה נשמע ציטוט מצחיק אבל כל פעם שאני שומע את המשפט הזה אני ישר חושב עליך ועולה בי חיוך, ואני רוצה לנצל את ההזדמנות בפקלוץ הזה להגיד שאני באמת אוהב אותך, כבר בסגל 0 שהגעת צעיר ומבולבל הבנתי שיש פה עסק עם בן אדם זהב, ושראיתי שאני עושה איתך סגל? אז בכלל הייתי עוד יותר שמח, אני חושב שלימדת אותי מלא, ואני רוצה לנצל את הפקלוץ הזה ולהתמקד בכמה עיקריים. הראשון הוא שלווה - אתה משדר שלווה, אתה מדבר על שלווה ואתה מסביר למה היא חשובה, לא רק במובן המילה אלא גם במובן הרוחני שלה. השני הוא סבלנות -  כמו שאתה מכיר אותי הפיוז שלי יכול להעלות, אבל אתה? לא חושב שראיתי אותך יוצא מבאלאנס, אתה ממקוד וענייני, אתה בוגר ויודע להתנהג כלפי כולם בסבלנות הראויה להם. הדבר האחרון הוא החום - אתה בן אדם חם, כיף לחבק אותך בבוקר וכיף לי לראות איך אנחנו תמיד שמחים לראות אחד את השני. קוראים לך הרבה בוט, אבל הם לא מכירים אותך באמת, אתה הכי רגיש, חכם, ענייני ונסיך שיש, היה לי העונג להיות איתך בשנה האחרונה שלי בבסמח, ואני בטוח שאתה תהיה הורה ואיש סגל מצוין בהמשך הסגלים פה, אני אוהב אותך המון וכבר מתגעגע, ניבי`

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
