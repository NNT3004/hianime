import styled from 'styled-components';

const Wrapper = styled.div`
  background: var(--black);
  display: flex;
  align-items: center;
  border-radius: var(--borderRadius);
  height: 36px;
  input {
    border: transparent;
    background: transparent;
    height: 100%;
    color: var(--textColor);
    flex-grow: 1;
    font-size: var(--small-text);
  }
  input:focus {
    outline: transparent;
  }
  button {
    color: var(--grey-800);
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: color 100ms;
    font-size: 1rem;
    padding: 0px 10px;
    height: 100%;
    &:hover {
      color: var(--grey-50);
    }
    &:disabled {
      color: var(--grey-900);
      cursor: default;
    }
  }
`;

export default Wrapper;
