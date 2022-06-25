import React from "react";

export function useTabFocus() {
  const [isFocusing, setIsFocusing] = React.useState(true);

  React.useEffect(() => {
    const handleFocus = () => {
      setIsFocusing(true);
    };

    const handleBlur = () => {
      setIsFocusing(false);
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);
  return {
    isFocusing,
  };
}
