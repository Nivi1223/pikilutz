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
      <a id="phone" style={{color: 'white', textDecoration: 'none', fontFamily: 'letter-content-font'}} href="tel:+972 543449982" onClick={phonePress}>
ניבי - 0543449982      </a>
    </div>
  );
};

export default Front;
