import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

html, #root, .App,body {
  height: 100%;
}

.App{
  overflow: hidden;
}

.Modal {
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  background: ${({ theme }) => theme.pallete.WHITE};
  overflow: auto;
  border-radius: 4px;
  outline: none;
  padding: 20px;
  margin-right: -50%;
  transform: translate(-50%, -50%);
max-width: 400px;
width: 80%;
  box-shadow:  ${({ theme }) => `0px 0px 20px 0px ${theme.pallete.GREY}`};
  display: flex;
  flex-direction: column;
  gap:16px
}

input {
  outline: none;
  border: none;
}

input[type=text]::placeholder {
  font-style: italic;
}

.Overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => `${theme.pallete.GREY}99`}
}

.Modal label{
  margin-bottom: 5px;
  display: block;
  text-transform: capitalize;
  font-weight: 500;
}

.Modal>div:last-child{
display: flex;
align-items: center;
justify-content: flex-end;
gap: 8px;
}

.Modal button {
  font-size: 18px;
  border-radius: 20px;
  padding: 8px 12px;
}

.close{
  &:after {
  content: '\\2716';
  font-size: 16px;
  cursor: pointer;
  padding: 8px;
}
}

.edit{
  transform: rotate(108deg);
  &:after {
  content: '\\270E';
  font-size: 16px;
  cursor: pointer;
}
}
`;

export default GlobalStyles;
