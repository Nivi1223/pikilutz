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

  const letterNew = `אני זוכר את הרגע של החשיפת סגלים של 24A שקיווינו שנצא ביחד בסגל ושבטוח נהיה קאפים, וואלה ברגע שם שלא יצאנו ביחד בסגל באמת התבאסתי, וגם בכללי שלא יצא לנו לעשות סגל שלם ביחד זה כן משהו שלדעתי היה פספוס מבחינתי.
אבל מהצד השני, יצא לי להסתכל עלייך מהצד ולראות אותך פשוט שולטת בכל מה שאת עושה, מנהלת את העניינים כמו בוס ומקבלת לא אחריות אחת ולא שתיים אלא כמה וכמה כבר בסגל הראשון שלך, ודוגרי אני באמת שמחתי לראות את זה, את עושה את הדברים בצורה פשוט מדויקת, וכמובן שאת לא שוכחת להוסיף פלפל סמיות וצחוק בכל רגע שאת נמצאת בחדס, ולדעתי זה שילוב פשוט מצוין.
אני מאחל לך להמשיך לתת בראש ולהיות טובה בדיוק כמו שאת, אני אתגעגע מלא, אוהב - ניבי ♥`

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
