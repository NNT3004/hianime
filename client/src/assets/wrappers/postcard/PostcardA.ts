import styled from 'styled-components';

const Wrapper = styled.article<{ $imgUrl: string }>`
  background-color: var(--backgroundColor);
  background-image: url(${(props) => props.$imgUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right;
  height: 550px;
  .shadow {
    display: flex;
    flex-direction: column-reverse;
    box-shadow: inset 100px -40px 100px 120px var(--black);
    width: 100%;
    height: 100%;
    padding: 50px;
    font-weight: var(--bodyFont);
    font-size: 1rem;
  }
  .content {
    width: 54%;
  }
  .title {
    font-size: 2.25rem;
    margin: 0;
  }
  .info {
    margin: 20px 0;
    .info-item {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      .icon {
        margin-right: 8px;
      }
      .text {
      }
    }
    .info-item:not(:first-child) {
      margin-left: 24px;
    }
  }
  .description {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export default Wrapper;
