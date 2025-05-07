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

  const letterNew = `אחי הקטןןן, מהרגע שנכנסתי לסגל 0 תמיד אמרתי לכולם איך באלי שתגיע והייתי בטוח שנהיה חברים מהרגע הראשון, וככה באמת היה, היה לנו את החיבור שלנו בין אם זה לדבר שעות על כדורסל ובין אם זה שאתה מנסה ללמד אותי פוטבול עם מלחיות במטבחון ואני מתלהב רצח, או שאנחנו סתם משחקים מסירות עם כדור פוטבול בדשא במסע.
בלי קשר לחבר שהיית, אני חושב שאתה פשוט תותח אמיתי, ששמו אותך צפה בסגל הראשון הבנתי טוב מאוד למה עשו את זה, פשוט סמכו עליך וידעו שאתה פסיכי כי כבר בסגל 0 התנהגת כמו סגמצ, אתה חושב על כל הדברים לעומק, אתה משימתי, יצירתי, מוכשר וחכם. בשנתיים האחרונות זה היה לי לעונג להכיר אותך וחבל לי שלא יצא לנו לעבוד ביחד, עכשיו שאתה באמת סגמצ ואני בטוח שתהיה סגמצ תותח, הגיע הזמן שלך להשאיר את המורשת שלך ואת הטוב שלך לאחרים. אוהב אותך מלא אחי ומצפה לשמוע ממך ועליך עוד, ואני בטוח שאשמע רק טוב, ניבי.`

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
