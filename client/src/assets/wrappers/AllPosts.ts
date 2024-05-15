import styled from 'styled-components';

const Wrapper = styled.div`
  .post-container {
    display: flex;
    flex-wrap: wrap;
    .post {
      flex: 0 0 calc(20% - 20px);
    }
    margin-bottom: 30px;
  }
`;

export default Wrapper;
