import styled from 'styled-components';

const Wrapper = styled.section`
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    p {
      font-size: 1.5rem;
      margin: 0;
      text-transform: capitalize;
    }
    nav {
      height: 42px;
      display: flex;
      align-items: center;
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
    }
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    .post {
    }
  }
`;

export default Wrapper;
