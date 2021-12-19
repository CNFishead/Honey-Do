import { useState, useEffect } from "react";

export const usePasswordValidation = ({ password1 = "", password2 = "" }) => {
  const [validLength, setValidLength] = useState(null);
  const [hasNumber, setHasNumber] = useState(null);
  const [upperCase, setUpperCase] = useState(null);
  const [lowerCase, setLowerCase] = useState(null);
  const [specialChar, setSpecialChar] = useState(null);
  const [match, setMatch] = useState(null);

  useEffect(() => {
    setValidLength(password1.length >= 6 ? true : false);
    // converts the password to lower case, if they equal each other,
    // then the password doesnt include an uppercase letter
    setUpperCase(password1.toLowerCase() !== password1);
    setLowerCase(password1.toUpperCase() !== password1);
    setHasNumber(/\d/.test(password1));
    // regex check for special character
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password1));
    // does passwords equal each other.
    setMatch(password1 && password1 === password2);
  }, [password1, password2]);

  return [validLength, hasNumber, upperCase, lowerCase, match, specialChar];
};
