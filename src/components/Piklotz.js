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

  const letterNew = `וואלה הזכרון הראשון שלי מהקשר שלנו זה שגילינו שאנחנו ביחד בסגל ואני פשוט הייתי ממש שמח, ואחרי שהמשכנו את הסגל הבנתי למה, אתה אחד החדים שראיתי, אתה מקצוען בקטע לא נורמלי, והיה לי כל כך כיף לעבור איתך את הסגל ושהתחברנו בטירוף בתקופה הזו, בין אם זה ללמוד ממך ולראות איך אתה חושב וביקורתי על הדברים סביבך, ובין אם זה לריב על האם צריך להתיישב רחוק או קרוב לגבול, בגדול - תענוג אמיתי.
מעבר לעבודה, אני חושב שהבן אדם שאתה הוא בן אדם מיוחד. אתה חברותי בקטע לא נורמלי ותמיד כיף לדבר איתך שיחות מסדרון או שיחות עמוקות או סתם להסתלבט על דברים מצחיקים שקרו.
אני אתגעגע מלא ואוהב המון, מצפה שנשמור על קשר ואולי עוד נתראה בענן, ניבי ♥`

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
