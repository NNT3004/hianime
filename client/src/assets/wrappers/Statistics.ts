import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 20px;
  .total {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    grid-gap: 1rem;
  }
  .chart-title {
    text-align: center;
    font-size: 1.5rem;
    margin: 100px 0 10px;
  }
`;

export default Wrapper;
