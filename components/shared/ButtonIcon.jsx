const ButtonIcon = ({ icon1, icon2, value, action }) => (
  <span
    onClick={action}
    className="rounded-full flex items-center justify-center border border-secondary bg-secondaryBg p-2"
  >
    {value ? icon1 : icon2}
  </span>
);

export default ButtonIcon;
