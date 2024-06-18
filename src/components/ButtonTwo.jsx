import React from "react";


 const ButtonTwo = ({ styles }) => (
 
  <button type="button"
  onClick={() => window.open('https://www.google.com/maps/place/123+Loan+Street,+Finance+City,+JS+45678', '_blank')}
  className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}>
    Let us Meet
  </button>
  
  
);

export default ButtonTwo;