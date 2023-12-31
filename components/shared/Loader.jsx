import { RiLoader3Line } from "react-icons/ri";

const Loader = ({text1, text2}) => (
  <div className="mt-10 w-full text-center flex flex-col justify-center items-center break-words">
    <RiLoader3Line className="h-20 w-20 text-primary animate-spin" />
    <span>{text1}</span>
    <span>{text2}</span>
  </div>
);

export default Loader;
