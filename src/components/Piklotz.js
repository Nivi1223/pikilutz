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

  const letterNew = `החצופה המדורית, וואלה לא חשבתי שתיכנסי לי ללב ככה בשנה האחרונה, לא אשקר בהתחלה הייתי אוכל עלייך סיבובים עם כל הש"צ שהייתי אומרת לי ולכולם, אבל בדיעבד זאת הייתה הדרך הכי טובה שלי ושלך להתחבר - דרך הצחוק הציניות והשטויות שהיינו עושים, אני באמת חושב שיש לך לב ענק, את כל כך בן אדם שאוהב ונותן מעצמו וזסה פשוט ממיס להסתכל על זה מהצד.
אני זוכר את השיחה שלנו במסע ב24A ליד המדורה שאמרת לי שאת לא יודעת כמה המקום הזה מתאים לך, ואני זוכר אז עם עצמי שידעתי שזה סתם איזה רגש חולף שהיה לך בראש שמתישהו יעבור לך, ועכשיו במעמד הזה פשוט כל כך קל להגיד כמה את כן מתאימה למקום הזה.
את התחברת פה לכל כך הרבה אנשים ויש לך השפעה על האווירה במדור בקטע לא נורמלי, אני תופס ממך מלא מלא מלא, וחושב שאת הולכת להיות אמא נדירה ואשת סגל שמסתכלים עליה בהערצה.
אתגעגע מלא ואוהב המון - ניבי ♥`

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
