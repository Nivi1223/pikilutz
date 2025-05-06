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

  const letterNew =
    "פאפוס אחשלי, הפעם הראשונה ששמעתי את השם שלך זה ההיה בהקשר של מבטים מוזרים ולא הבנתי כל כך מי אתה. אבל בשניה שנכנסת לפה למדור יצא לי לגלות את הבן אדם המלא אהבה שאתה, כל בוקר הדבר הראשון שהייתי מחכה לו זה החיבוק ממך כי הוא היה הכי אמיתי, ומעבר לאיש סגל המטורף שאתה, ושהיה לי כל כך כיף להעביר איתה סגל, לעשות איתך וויל קורע מצחוק, ולחוות את המפקד המצוין שאתה, אז קיים בן אדם טהור, ואני חושב שזו המילה הכי מדויקת שיכולה לתאר אותך. אתה עושה טוב לאנשים סביבך ואף פעם לא מתפשר על הדברים שאתה עושה, זה מתחיל מהחיבוק, עד השף שאתה, ועד המפקד שאתה, לרגעים הייתי רוצה להיות חניך שיושב ומקשיב לך בשיחה אישית, ואני מקנא באלה שמקשיבים. תמשיך להיות הבן אדם הטהור הזה, תהנה מהרגעים האחרונים שלך פה במדור, וכל הטוב שאתה מפיץ, יעוף עליך בחזרה, היה לי העונג אחי, אני אוהב אותך על מלא, ניבי.";

  const decryptLetter = useCallback((encryptedLetter) => {
    const encrypt = CryptoJS.AES.encrypt(
      letterNew,
      process.env.REACT_APP_SECRET
    ).toString();

    console.log(encrypt);
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
