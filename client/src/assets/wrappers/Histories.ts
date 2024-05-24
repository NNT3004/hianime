import styled from 'styled-components';

const Wrapper = styled.section`
  flex-grow: 1;
  max-width: 1024px;
  margin: 0 auto;
  header {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    .his-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }
    p {
      padding: 0 20px;
      font-size: 1.75rem;
      margin: 0;
      text-transform: capitalize;
    }
    .btn {
      color: var(--grey-800);
      display: flex;
      align-items: center;
      font-size: 1rem;
      cursor: pointer;
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 6px;
      }
      &:hover {
        color: #eeeeee;
      }
    }
  }
  .container {
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: auto;
    grid-gap: 1rem;
  }
`;

export default Wrapper;
