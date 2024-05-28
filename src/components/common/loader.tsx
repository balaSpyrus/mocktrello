import { AiOutlineLoading } from 'react-icons/ai';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Loader = styled(AiOutlineLoading).attrs((props) => ({ size: props.size || 80 }))<{
  color?: string;
}>`
  stroke-width: 12px;
  animation: ${spin} 0.8s ease-in-out infinite;
  color: ${({ theme, color }) => color || theme.pallete.BLUE};
`;
