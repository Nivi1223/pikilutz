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

  const letterNew = `וואלה אני מה זה שמח שיצא לנו להתחבר ככה בחודשים האחרונים פה, מהקורס עוד ידעתי שאת פשוט מתאימה לפה ושאת מקצוענית רצח, שהגעת לפה פשוט הייתי בהלם לראות איך כל הציפיות שלי מתפוצצות כי היית פשוט מטורפת, מפתחת בנונשלטיות למערכות בסגל 0 וכבר יוצרת פה חברויות במדור בכזו קלות, זה פשוט היה לי כיף לראות את זה מהצד והאמת קצת צובט שאני צריך לעזוב בדיוק עכשיו את המדור.
אני באמת מאחל לך שיהיו לך פה שנתיים מטורפות, שתגיעי לכל הידעים שאת רוצה, שתשיגי כל מטרה שתעמוד לך בדרך, ושתהיי האשת סגל הטובה שאת.
מקווה שאת יודעת כמה את טובה, ואם לא? אז יש לך עוד סיבה לקרוא את הפקלוץ הזה ולהבין שכן.
אוהב מלא - ניבי♥`

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
