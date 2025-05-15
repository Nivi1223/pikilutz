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

  const letterNew = `אני  חושב שכבר ביום יומיים הראשונים של הקורס היה לי ברור שאתה הולך להגיע לפה למדור, וההסבר לזה היה פשוט - אתה פשוט אחד משלנו, לא היה קשה להבחין בזה, היית מאוד בולט ודומיננטי מהרגע הראשון ושמחתי מאוד שהגעת לכאן למדור, ובנינו, לאף אחד לא היה ספק שזה יקרה.
מהרגעים הראשונים שלך פה כבר במדור התחלת להשאיר את החותם שלך עם השגעונות והצחוקים שאתה עושה, ישר התחברת לשכבה שלנו ויצרנו חבורת בנים טובה כזו שתמיד יהיה כיף לשבת על בירה ביחד ולדבר על נושאים גבריים אותנטיים כאלה.
ופאן האישי אני חושב שהיה לי העונג להכיר אותך ושנהינו חברים טובים, אני באמת חושב שאתה בן אדם מיוחד, אתה תותח בכל מה שאתה עושה ואני בטוח שאתה הולך לשנות פה את פני היחידה מקצה לקצה.
אני אתגעגע אבל אני בטוח שנצליח לשמור על קשר, ושנלך עוד למשחקים של מכבי מול הפועל ושנעשה ערבי בירה טובים כאלה כמו בימים הטובים, תמשיך להיות המלך שאתה, אוהב מלא אחשלי - ניבי ♥`

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
