import { useState, useMemo } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { MdImage, MdImageNotSupported } from "react-icons/md";
const chooseFontSizeClass = (amountOfWords) => {
  let fontSize;

  switch (true) {
    case amountOfWords <= 80:
      fontSize = "xl";
      break;
    case amountOfWords < 110:
      fontSize = "lg";
      break;
    case amountOfWords < 150:
      fontSize = "md";
      break;
    case amountOfWords < 190:
      fontSize = "sm";
      break;
    case amountOfWords < 295:
      fontSize = "bni";
      break;
    case amountOfWords < 330:
      fontSize = "xs";
      break;
    default:
      fontSize = "xxs";
      break;
  }

  return `text-${fontSize}`;
};

const Back = ({
  setIsCardFlipped,
  personData: { start_of_letter, letter, img },
}) => {
  const [isImgShown, setIsImgShown] = useState(false);
  const fontSizeClass = useMemo(
    () => chooseFontSizeClass(letter.split(" ").length),
    [letter]
  );

  return (
    <div className="back">
      {img && (
        <img
          src={require(`../assets/images/${img}`)}
          alt="with person"
          id="photo"
          className={isImgShown ? "fly-in" : ""}
        />
      )}
      <section id="letter">
        <h1 className={fontSizeClass} id="letter-title">
          {start_of_letter}
        </h1>
        <p className={fontSizeClass} id="letter-content">
          {letter}
        </p>
      </section>
      <footer id="back-footer">
        <FaArrowCircleLeft
          style={{
            transform: "rotateY(180deg)",
          }}
          className="pressable back-icon"
          onClick={() => setIsCardFlipped(false)}
        />
        {img && (
          <>
            {isImgShown ? (
              <MdImageNotSupported
                className="pressable back-icon"
                onClick={() => setIsImgShown(false)}
              />
            ) : (
              <MdImage
                className="pressable back-icon"
                onClick={() => setIsImgShown(true)}
              />
            )}
          </>
        )}
      </footer>
    </div>
  );
};

export default Back;
