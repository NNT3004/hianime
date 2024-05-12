import styled from 'styled-components';

const Wrapper = styled.div`
  border-top-color: var(--primary-500);
  border-top-width: 2px;
  border-top-style: solid;
  padding: 20px;
  header {
    padding: 10px;
    p {
      font-size: 1.5rem;
      margin: 0;
      text-transform: capitalize;
    }
  }
`;

export default Wrapper;
