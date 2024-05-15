import styled from 'styled-components';

const Wrapper = styled.div`
  .wrapper {
    padding: 40px;
    .form-row {
      margin: 18px 0;
      width: 100%;
      display: flex;
      & > .col {
        width: 50%;
        display: flex;
        &:nth-child(2) {
          margin-left: 25px;
        }
      }
      & > .col-ver {
        .ant-upload {
          width: 150px;
          height: 150px;
        }
        label {
          width: 100%;
          margin-bottom: 14px;
        }
        width: 50%;
        text-align: center;
      }
      label {
        display: block;
        width: 100px;
      }
      .input {
        min-height: 30px;
        flex-grow: 1;
        width: auto;
      }
    }
    .btns {
      margin-top: 60px;
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
`;

export default Wrapper;
