import React from "react";


 const ButtonTwo = ({ styles }) => (
 
  <button type="button"
  onClick={() => window.open("https://www.google.com/maps/place/28%C2%B037'48.3%22N+77%C2%B004'52.9%22E/@28.6300752,77.0787848,17z/data=!3m1!4b1!4m4!3m3!8m2!3d28.6300752!4d77.0813597?hl=en&entry=ttu")}
  className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}>
    Let us Meet
  </button>
  
  
);

export default ButtonTwo;