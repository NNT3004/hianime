import styled from 'styled-components';

const Wrapper = styled.aside`
  width: 320px;
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
    span {
      background-color: black;
      padding: 2px;
      border-radius: 5px;
      display: flex;
      button {
        &:nth-child(2) {
          margin: 0 3px;
        }
        color: var(--grey-800);
        padding: 10px 0;
        background-color: transparent;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: background-color 100ms;
        width: 45px;
        &:hover {
          background-color: var(--grey-900);
          color: var(--grey-50);
        }
      }
      button.activate {
        background-color: var(--primary-500);
        color: var(--white);
      }
    }
  }
  .container {
    .item {
      display: flex;
      align-items: center;
      border-right-color: var(--primary-500);
      border-right-width: 3px;
      border-right-style: solid;
      border-radius: 8px;
      background-color: black;
      transition: background-color 100ms;
      margin: 10px 0;
      cursor: pointer;
      .rank {
        font-family: var(--outlineFont);
        width: 40px;
        text-align: center;
        font-size: 60px;
        font-weight: bold;
      }
      .post {
        width: 280px;
        margin-top: auto;
        margin-bottom: auto;
      }
      &:hover {
        background-color: var(--grey-900);
        color: white;
      }
    }
  }
`;

export default Wrapper;
