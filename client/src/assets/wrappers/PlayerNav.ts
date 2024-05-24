import styled from 'styled-components';

const Wrapper = styled.aside`
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  margin-top: -10px;
  user-select: none;
  li {
    list-style-type: none;
    display: flex;
  }
  .setting {
    .btn {
      font-size: 0.865rem;
      width: 110px;
      cursor: pointer;
      .on {
        color: var(--primary-500);
      }
      .off {
        color: #d10000;
      }
      line-height: 36px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
  .nav {
    .btn {
      color: var(--white);
      &:hover {
        color: var(--primary-500);
      }
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 4px;
      .icon {
        margin-left: 6px;
      }
      &:first-child {
        margin-right: 10px;
        .icon {
          margin-right: 6px;
          margin-left: 0;
        }
      }
    }
  }
  .btn.disabled,
  .btn.disabled:hover {
    color: var(--grey-800);
    cursor: default;
  }
`;

export default Wrapper;
