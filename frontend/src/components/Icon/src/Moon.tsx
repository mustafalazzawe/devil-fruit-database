import { forwardRef, memo, Ref, SVGProps } from "react";
import IconWrapper from "../Icon.styled";

const MoonIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <IconWrapper
    width={props.fontSize || 24}
    height={props.fontSize || 24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.4863 4.76792C7.72194 5.03144 4.75 8.16865 4.75 12C4.75 16.0041 7.99594 19.25 12 19.25C15.2079 19.25 17.9297 17.1662 18.8848 14.2787C18.1497 14.5824 17.3441 14.75 16.5 14.75C13.0482 14.75 10.25 11.9518 10.25 8.5C10.25 7.10086 10.7101 5.80909 11.4863 4.76792ZM3.25 12C3.25 7.16751 7.16751 3.25 12 3.25C12.4496 3.25 12.8918 3.28398 13.3239 3.34962C13.6229 3.39503 13.8654 3.61553 13.9388 3.90886C14.0123 4.20219 13.9025 4.51095 13.6602 4.69194C12.4992 5.55935 11.75 6.94208 11.75 8.5C11.75 11.1234 13.8766 13.25 16.5 13.25C17.6342 13.25 18.6738 12.8534 19.4905 12.1906C19.7252 12.0002 20.0513 11.9692 20.3176 12.1121C20.584 12.255 20.7386 12.5437 20.7097 12.8446C20.2843 17.2812 16.5477 20.75 12 20.75C7.16751 20.75 3.25 16.8325 3.25 12Z"
      fill={props.fill || " "}
    />
  </IconWrapper>
);

const ForwardRef = forwardRef(MoonIcon);
const Memo = memo(ForwardRef);

export default Memo;
