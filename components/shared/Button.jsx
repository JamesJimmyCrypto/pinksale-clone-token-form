const Button = ({ text, action, styles, type = "button", modify }) => {
  const primaryStyles = "text-primary border border-primary bg-primaryBg";
  const secondaryStyles = "text-secondary bg-secondaryBg";

  return (
    <button
      className={`py-2 px-4 rounded-lg capitalize shadow-lg hover:shadow-none text-base font-semibold transition-all ${
        styles === "secondary" ? secondaryStyles : primaryStyles
      } ${modify}`}
      onClick={action}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
