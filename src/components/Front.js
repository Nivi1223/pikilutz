import { FaHandPointLeft, FaHandPointRight } from "react-icons/fa";

const Front = ({
  isCardFlipped,
  isLogoPressed,
  isPhonePressed,
  logoPress,
  phonePress,
}) => {
  return (
    <div className="front">
      {!isLogoPressed && (
        <FaHandPointRight
          className="press"
          style={{ transform: "rotateZ(30deg)", left: 40, top: 30 }}
        />
      )}
      {!isCardFlipped && !isPhonePressed && (
        <FaHandPointLeft
          className="press"
          style={{ transform: "rotateZ(50deg)", right: 0, bottom: 10 }}
        />
      )}
      <div id="logo" className="pressable" onClick={logoPress}></div>
      <a id="phone" href="tel:+972 546232883" onClick={phonePress}>
        ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎{" "}
      </a>
    </div>
  );
};

export default Front;
