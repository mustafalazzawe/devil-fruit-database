import { forwardRef, memo, Ref, SVGProps } from "react";
import IconWrapper from "../Icon.styled";

const AdjustIcon = (
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
      d="M13.3535 8.75H4C3.58579 8.75 3.25 8.41421 3.25 8C3.25 7.58579 3.58579 7.25 4 7.25H13.3535C13.68 6.09575 14.7412 5.25 16 5.25C17.2588 5.25 18.32 6.09575 18.6465 7.25H20C20.4142 7.25 20.75 7.58579 20.75 8C20.75 8.41421 20.4142 8.75 20 8.75H18.6465C18.32 9.90425 17.2588 10.75 16 10.75C14.7412 10.75 13.68 9.90425 13.3535 8.75ZM14.75 8C14.75 7.30964 15.3096 6.75 16 6.75C16.6904 6.75 17.25 7.30964 17.25 8C17.25 8.69036 16.6904 9.25 16 9.25C15.3096 9.25 14.75 8.69036 14.75 8Z"
      fill={props.fill || " "}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.6465 16.75H20C20.4142 16.75 20.75 16.4142 20.75 16C20.75 15.5858 20.4142 15.25 20 15.25H10.6465C10.32 14.0957 9.25878 13.25 8 13.25C6.74122 13.25 5.67998 14.0957 5.35352 15.25H4C3.58579 15.25 3.25 15.5858 3.25 16C3.25 16.4142 3.58579 16.75 4 16.75H5.35352C5.67998 17.9043 6.74122 18.75 8 18.75C9.25878 18.75 10.32 17.9043 10.6465 16.75ZM6.75 16C6.75 15.3096 7.30964 14.75 8 14.75C8.69036 14.75 9.25 15.3096 9.25 16C9.25 16.6904 8.69036 17.25 8 17.25C7.30964 17.25 6.75 16.6904 6.75 16Z"
      fill={props.fill || " "}
    />
  </IconWrapper>
);

const ForwardRef = forwardRef(AdjustIcon);
const Memo = memo(ForwardRef);

export default Memo;
