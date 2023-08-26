import styled from "styled-components";

export const caratURL = (color = "black") =>
  `data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='${color}' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>`;

export const StyledSelect = styled.select`
  outline: none;
  min-height: 24px;
  padding: 8px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 700;
  background: url("${caratURL()}") no-repeat;
  background-position: calc(100% - 0.75rem) center !important;
  -moz-appearance: none !important;
  -webkit-appearance: none !important;
  appearance: none !important;
  padding-right: 2rem !important;

  & > option {
    font-weight: 700;
  }
`;
