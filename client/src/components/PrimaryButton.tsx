import { IconType } from 'react-icons';
import Wrapper from '../assets/wrappers/PrimaryButton';

interface PrimaryButtonProps {
  startIcon?: IconType;
  endIcon?: IconType;
  children: string;
  className?: string;
  disabled?: boolean;
}

function PrimaryButton(props: PrimaryButtonProps) {
  const {className, disabled} = props;
  return (
    <Wrapper {...{disabled, className}}>
      {props.startIcon && <props.startIcon className='btn__start-icon'/>}
      <span className='btn__text'>{props.children}</span>
      {props.endIcon && <props.endIcon className='btn__end-icon'/>}
    </Wrapper>
  );
}

export default PrimaryButton;
