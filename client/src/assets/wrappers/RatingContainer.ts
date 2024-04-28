import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  height: 300px;
  p {
    margin: 0;
  }
  .sep-dot {
    font-size: 10px;
    margin: 0 6px;
  }
  .poster {
    padding: 40px;
    img {
      width: 120px;
      border-radius: 4px;
    }
  }
  .info {
    padding: 40px 6px;
    width: 600px;
    .title {
      font-size: 1.75rem;
    }
    .meta-info {
      display: flex;
      align-items: center;
      span {
      }
      .item {
        font-size: 0.875rem;
        background-color: rgba(255, 255, 255, 0.6);
        opacity: 0.8;
        border-radius: var(--borderRadius);
        padding: 4px 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 100%;
        color: var(--black);
        .icon {
          margin-right: 1.5px;
        }
        .text {
          margin-left: 1.5px;
          font-size: 0.73rem;
        }
      }
    }
  }
  .rating-container {
    display: flex;
    align-items: center;
    height: 100%;
    .rating {
    }
  }
`;

export default Wrapper;
