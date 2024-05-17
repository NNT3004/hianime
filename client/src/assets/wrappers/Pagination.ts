import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  nav {
    height: 36px;
    width: 36px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--grey-500);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 3px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    &:hover {
      color: var(--white);
      background-color: var(--primary-500-light);
    }
  }
  nav.activate {
    background-color: var(--primary-500);
    color: var(--white);
  }
`;

export default Wrapper;
