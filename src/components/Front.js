import { FaHandPointLeft } from "react-icons/fa";

const Front = ({
  logoPress,
  phonePress,
}) => {
  return (
    <div className="front">
      <FaHandPointLeft
        className="press"
        style={{ transform: "rotateZ(50deg)", right: 5, bottom: 15 }}
      />
      <div id="logo" className="pressable" onClick={logoPress}></div>
      <a
        id="phone"
        style={{
          color: "white",
          textDecoration: "none",
          fontFamily: "letter-content-font",
        }}
        href="https://api.whatsapp.com/send/?phone=972543449982&text=היי%20ניבי"
        onClick={phonePress}
      >
        ניבי - 0543449982{" "}
      </a>
    </div>
  );
};

export default Front;
