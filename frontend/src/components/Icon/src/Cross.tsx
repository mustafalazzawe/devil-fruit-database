import { forwardRef, memo, Ref, SVGProps } from "react";
import IconWrapper from "../Icon.styled";

const CopyIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M7.19102 7.19102C7.44571 6.93633 7.85864 6.93633 8.11333 7.19102L12.0001 11.0777L15.8867 7.19112C16.1414 6.93643 16.5543 6.93643 16.809 7.19112C17.0637 7.44581 17.0637 7.85874 16.809 8.11343L12.9224 12L16.809 15.8866C17.0637 16.1413 17.0637 16.5542 16.809 16.8089C16.5543 17.0636 16.1414 17.0636 15.8867 16.8089L12.0001 12.9223L8.11333 16.809C7.85864 17.0637 7.44571 17.0637 7.19102 16.809C6.93633 16.5543 6.93633 16.1414 7.19102 15.8867L11.0777 12L7.19102 8.11332C6.93633 7.85864 6.93633 7.4457 7.19102 7.19102Z"
      fill={props.fill || " "}
    />
  </IconWrapper>
);

const ForwardRef = forwardRef(CopyIcon);
const Memo = memo(ForwardRef);

export default Memo;
