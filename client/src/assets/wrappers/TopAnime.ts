import styled from 'styled-components';

const Wrapper = styled.aside`
  width: 320px;
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    p {
      font-size: 1.3rem;
      margin: 0;
      color: white;
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
        padding: 3px;
        background-color: transparent;
        border: none;
        border-radius: 3px;
        color: var(--white);
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: color 100ms;
        width: 50px;
        &:hover {
          background-color: var(--grey-500);
        }
      }
      button.activate {
        background-color: var(--primary-500);
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
      &:not(:first-child) {
        margin-top: 8px;
      }
      &:hover {
        background-color: var(--grey-900);
        color: white;
      }
    }
  }
`;

export default Wrapper;
