import styled from 'styled-components';

const Wrapper = styled.div`
  nav {
    margin-left: 30px;
  }
  .card-container {
    border-radius: 8px;
    background-color: #393e46;
    padding: 40px;
    margin: 0 30px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    transition: box-shadow 0.3s;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    }
    .filter {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: auto;
      grid-gap: 1rem;
      .what {
        width: 80px;
        display: inline-block;
      }
      .filter-item {
        width: 100%;
        display: flex;
        align-items: baseline;
      }
    }
    .genres {
      display: flex;
      margin-top: 1rem;
      margin-bottom: 2rem;
      .what {
        width: 80px;
        display: inline-block;
      }
    }
    .btn-container {
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
    }
  }
`;

export default Wrapper;
