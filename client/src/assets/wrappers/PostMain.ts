import styled from 'styled-components';

const Wrapper = styled.div`
  .main {
    & > .nav {
      display: flex;
      align-items: center;
      .sep-dot {
        font-size: 10px;
        margin: 0 6px;
      }
      margin: 18px 38px;
    }
    .watch {
      border: 1px solid var(--primary-500);
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      margin: 0 38px;
      position: relative;
      padding-left: 300px;
      .episode-list {
        width: 300px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
      }
      .player {
        background-color: #1a1e21;
        flex-grow: 1;
        .frame {
          aspect-ratio: 16/9;
          border-radius: 0;
          background-color: #000;
        }
      }
    }
  }
`;

export default Wrapper;
