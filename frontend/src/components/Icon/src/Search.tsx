import { forwardRef, memo, Ref, SVGProps } from "react";
import IconWrapper from "../Icon.styled";

const SearchIcon = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
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
      d="M14.3851 15.4457C11.7348 17.5684 7.85537 17.4013 5.39858 14.9445C2.76254 12.3085 2.76254 8.03464 5.39858 5.3986C8.03462 2.76256 12.3085 2.76256 14.9445 5.3986C17.4013 7.85538 17.5684 11.7348 15.4457 14.3851L20.6014 19.5407C20.8943 19.8336 20.8943 20.3085 20.6014 20.6014C20.3085 20.8943 19.8336 20.8943 19.5407 20.6014L14.3851 15.4457ZM6.45924 13.8839C4.40899 11.8336 4.40899 8.50951 6.45924 6.45926C8.5095 4.40901 11.8336 4.40901 13.8839 6.45926C15.9326 8.50801 15.9341 11.8287 13.8884 13.8794C13.8869 13.8809 13.8854 13.8823 13.8838 13.8839C13.8823 13.8854 13.8808 13.8869 13.8794 13.8884C11.8287 15.9341 8.50799 15.9326 6.45924 13.8839Z"
      fill={props.fill || " "}
    />
  </IconWrapper>
);

const ForwardRef = forwardRef(SearchIcon);
const Memo = memo(ForwardRef);

export default Memo;
