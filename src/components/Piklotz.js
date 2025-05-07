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

  const letterNew = `רומו אחי האהוב, האחד שעברתי איתו הכי הרבה זמן בבסמח ושצברתי איתו הכי הרבה חוויות, אני אנסה להיות תמציתי אבל באמת קשה לי לסכם את התקופה המטורפת הזו איתך, אז אני אתחיל ואגיד שאתה פאקינג מקצוען אמיתי, יש לך תשוקה למקצוע ולתפקיד עצמו מהגבוהות שראיתי, ואתה מציב רף מאוד גבוה לעצמך ולסובבים אותך, בשנה האחרונה יצא לי לראות את רומיאו של תחילת הסגל הראשון, שבהתחלה לא ידעתי בכלל למה לצפות, הופך לרומיאו הסגמצ הדומיננטי והחזק שאתה. אני בטוחה שאתה הולך לקחת את החצי שנה הזו ברצינות ואתה תהיה באמת הסגמצ הכי טוב שהסגל שלך יכול לבקש, הלוואי ויכולתי לעשות איתך עוד סגל.
ומעבר לכל הטוב הזה שיש בך בתור איש סגל כאן במדור, יצא לי להכיר חבר אמת, אני חושב שהנקודת מפנה של הקשר שלי ושלך היה במסע של 24A, בהתנדבות הייתה לנו שיחת נפש על ודיברנו על האקסיות שלנו כמו שתי זקנות מסכנות, ושם הבנתי שזכיתי בך בתור חבר, אני כותב את הפקלוץ הזה ומתמלא געגוע אליך, אתה בן אדם שכיף לדבר איתו, אתה אוזן קשבת אמיתית, ויש בך טוב טהור ואמיתי שמגיע מהלב הענק שלך, שלעתים אני מסתכל על עצמי ומייחל לעצמי להיות קצת רומיאו לפעמים, עם החיוך הקורן שלך, והחיבוק החם. אני מקווה שאתה יודע את זה על עצמך, אני אוהב אותך מכל ליבי, והיה לי העונג להכיר אותך, ניבי  ♥`

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
