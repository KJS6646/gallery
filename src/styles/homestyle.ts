import styled from "styled-components";

export const StyledHome = styled.div`
  .ant-layout-header {
    padding: 0.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    position: sticky;
    top: 0;
    background-color: rgb(240, 208, 244);
    z-index: 1000;
  }

  .ant-layout-content {
    padding: 24px;
    margin: 0;
    background-color: white;
    min-height: 800px;
  }

  .logo-img {
    height: 61px;
    width: 61px;
    background-color: white;
    border-radius: 50%;
  }
  .logo-img-box {
    display: flex;
    position: sticky;
    top: 0;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #e6e6e6;
    }
  }

  .ant-layout-sider-children {
    background-color: rgb(240, 208, 244);
  }

  .ant-menu {
    background-color: white;
    position: sticky;
    top: 63px;
  }
  .ant-menu-title-content {
    color: black;
  }
  .ant-menu-inline-collapsed-noicon {
    color: black;
  }
  .mobile-sider {
    display: none;
  }
  .mobile-left-sider {
    display: none;
  }
  @media (max-width: 768px) {
    .left_sider {
      display: none;
    }
    .ant-layout-content {
      width: 90%;
      padding: 14px;
      overflow-x: none;
    }
    .mobile-left-sider {
      display: block;
      width: 100px;
    }
    .mobile-sider {
      display: block;
      width: 100%;
      background-color: rgb(240, 208, 244);
      z-index: 1000;
    }
  }
`;
