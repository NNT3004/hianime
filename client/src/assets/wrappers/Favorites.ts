import styled from 'styled-components';

const Wrapper = styled.section`
  flex-grow: 1;
  max-width: 1024px;
  margin: 0 auto;
  header {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    .fav-icon {
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
  }
  .container {
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: auto;
    grid-gap: 1rem;
    .post-with-btn {
      position: relative;
      .delete-btn {
        position: absolute;
        right: -8px;
        top: -8px;
        border: none;
        background-color: var(--white);
        border-radius: 50%;
        color: var(--black);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 100ms;
        font-size: 16px;
        padding: 6px;
        &:hover {
          background-color: var(--primary-500);
          color: var(--white);
        }
      }
    }
  }
`;

export default Wrapper;
