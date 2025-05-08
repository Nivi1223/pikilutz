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

  const letterNew = `אחח איזה בן קיבלתי, אני לא אשכח את השיחה עם איה במטבחון שהיא מודיעה לי שאתה הבן שלי, בכנות - הייתי שמח, הרגיש לי שאני מקבל מישהו שהוא שונה ממני אבל בו זמנית יכול להיות כל כך דומה לי וכך באמת היה, מהחשיפה עד הכניסה שלך לסגל שהיינו עושים סלפי ונקרעים מצחוק מכל שטות אפשרית, ועד זה שאני רואה אותך פשוט לא צריך אותי כבר בסגל 0 שלך כי אתה פשוט מקצוען ויודע את העבודה.
אם הייתי יכול לסכם את מי שאתה במילה אחת הייתי בוחר "חיוך", אני תמיד רואה אותך מחייך וצוחק עם האנשים סביבך, שאני תמיד סביבך לא עוברות 3 שניות וכבר אנחנו מוצאים משהו לצחוק עליו ו99 אחוז מהפעמים זה בגלל כמה שאתה שנון ותמיד יודע להגיד את המילה הכי קורעת מצחוק, נכנסת לי ללב אחושרמוטה, ובאמת שלא יכולתי לבקש לעצמי בן טוב יותר, ועכשיו אתה נכנס בעצמך לעמדת האבא, ואני בטוח שיכנס לשושלת שלנו ילד שיסתכל על החונך שלו וישאף להיות כמוהו. לא נשאר לי עוד מה לאחל חוץ מבהצלחה מלא, ושאני אוהב אותך בני האהוב, אבוש.♥`

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
