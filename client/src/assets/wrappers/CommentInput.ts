import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    padding: 10px;
    .left {
        img {
            height: 50px;
            width: 50px;
            border-radius: 50%;
            object-fit: cover;
        }
        padding: 0 16px;
        padding-left: 0;
    }
    .right {
        flex-grow: 1;
        .header {
            margin: 6px 0;
            font-size: 1rem;
        }
        .comment {
            font-size: 1rem;
            background-color: #111;
            color: var(--text-color);
            border: none;
        }
        .btn-container {
            display: flex;
            flex-direction: row-reverse;
            padding: 10px;
            button {
                padding: 0;
                height: 32px;
            }
            .cancel {
                background-color: transparent;
                margin-left: 20px;
                &:hover {
                    color: var(--grey-900);
                }
            }
        }
    }
`;

export default Wrapper;