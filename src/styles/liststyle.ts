import styled from "styled-components";

export const StyledList = styled.div`
  .ant-spin {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
  }
  .contentStyle {
    margin: 0;
    height: 500px;
    width: 500px;
    color: #fff;
    line-height: 500px;
    text-align: center;
    background-color: #364d79;
  }
  .search__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .infinite__div {
    margin-bottom: 30%;
    padding: 20px;
    border-radius: 10px;
    transition: background-color 0.3s ease;
    height: 500px;
    h2 {
      margin-bottom: 10px;
      font-size: 15px;
      color: #333;
    }
  }
  .infinite-scroll-component__outerdiv {
    overflow-y: hidden;
  }
  @media (max-width: 768px) {
    .infinite__div {
      padding: 0;
      margin-bottom: 50px;
      height: 40vh;
    }
    .contentStyle {
      width: 100%;
      height: 30vh;
    }
  }
`;
