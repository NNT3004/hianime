import styled from 'styled-components';

const Wrapper = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 6px;
  thead {
    text-transform: capitalize;
    background-color: #1d2323;
  }
  tbody {
    tr {
      background-color: #63686e;
      &:hover {
        background-color: #929aab;
      }
      td {
        padding: 6px 0px 6px 30px;
        color: var(--white);
      }
    }
  }
  th {
    padding: 6px 0px 6px 30px;
    text-align: left;
  }
  th:first-child {
    border-radius: 5px 0 0 5px;
  }

  th:last-child {
    border-radius: 0 5px 5px 0;
  }
  tr:first-child td:first-child {
    border-top-left-radius: 5px;
  }
  tr:first-child td:last-child {
    border-top-right-radius: 5px;
  }

  tr:last-child td:first-child {
    border-bottom-left-radius: 5px;
  }
  tr:last-child td:last-child {
    border-bottom-right-radius: 5px;
  }
  .action {
    padding: 8px 0;
  }
  .action-btn {
    width: 30px;
    height: 30px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      background-color: #63686e;
      .btn-menu {
        display: block;
      }
    }
    position: relative;
  }
  .action-icon {
  }
  .btn-menu {
    position: absolute;
    display: none;
    background-color: #63686e;
    left: 0;
    bottom: 0;
    border-radius: 5px;
    padding: 6px 0;
    transform: translateY(100%);
    z-index: 10;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    .btn-item {
      display: flex;
      align-items: center;
      border-radius: 3px;
      padding: 2px 12px;
      &:hover {
        background-color: #929aab;
      }
      span {
        margin-left: 10px;
      }
    }
  }
`;

export default Wrapper;
