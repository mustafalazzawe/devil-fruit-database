import { forwardRef, memo, Ref, SVGProps } from "react";
import IconWrapper from "../Icon.styled";

const CheckIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M18.2803 8.21967C18.5732 8.51256 18.5732 8.98744 18.2803 9.28033L11.2803 16.2803C10.9874 16.5732 10.5126 16.5732 10.2197 16.2803L6.21967 12.2803C5.92678 11.9874 5.92678 11.5126 6.21967 11.2197C6.51256 10.9268 6.98744 10.9268 7.28033 11.2197L10.75 14.6893L17.2197 8.21967C17.5126 7.92678 17.9874 7.92678 18.2803 8.21967Z"
      fill={props.fill || " "}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      fill={props.fill || " "}
    />
  </IconWrapper>
);

const ForwardRef = forwardRef(CheckIcon);
const Memo = memo(ForwardRef);

export default Memo;