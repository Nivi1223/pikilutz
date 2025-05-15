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

  const letterNew = `האיש והבירה, שמע אתה נראלי מסוג האנשים שאם היינו ביחד בתיכון היינו נהיים חברים מה זה טובים, כי אתה פשוט שאקל, אתה זורם על הכל, תמיד קליל וכיף ויש אווירה טובה, אבל מהצד השני יש לך גם את העומק את הרציניות ואת הסוס עבודה שאתה.
לא חושב שראיתי סגל ראשון ככה עושה ג'אגלינג מטורף כמוך בין מיליון אחריויות כמו איזה מלך, ופשוט עושה את זה באהבה, לא חושב שראיתי אותך מתלונן או מתבכיין, כי אתה שם את הלב שלך על השולחן ועושה את הדברים על הצד הטוב שלהם.
אני בטוח שאתה הולך להינות רצח בצפ"ה ולהשקיע רצח בקורס, ואתה תחזור להיות סגמצ חריף רצח שכל הסגל שלו יעריץ אותו.
מאחל לך מלא בהצלחה וכבר מתגעגע - ניבי ♥`

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
