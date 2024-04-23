import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  z-index: 999;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  background-color: #000;
  padding: 0px 16px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  box-shadow: var(--shadow-4);
  .logo {
    height: 40px;
    margin: 0 10px 0 30px;
  };
  .search {
    margin: 0 20px;
    flex-grow: 1;
    max-width: 600px;
  };
  .menu {
    color: var(--textColor);
    font-size: 24px;
    cursor: pointer;
  };
  .menu:hover {
    color: var(--grey-50);
  };
  .center {
    display: flex;
    flex-grow: 1;
    height: 100%;
    align-items: center;
  }
`;

export default Wrapper;
