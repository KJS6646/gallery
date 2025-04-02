import styled from "styled-components";

export const StyledList = styled.div`
  /* 로딩 스피너 스타일 */
  .ant-spin {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
  }

  /* 검색 필터 스타일 */
  .search__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin: 20px 0;
  }
  .carousel-img {
    background-color: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  /* 리스트 아이템 스타일 */
  .infinite__div {
    display: flex;
    flex-direction: column;
    width: 40vw;
    border-radius: 10px;
    transition: background-color 0.3s ease;
    padding: 20px;
    margin-bottom: 40px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  .infinite-scroll-component__outerdiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
    padding: 16px;
    background: #ffffff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  /* 반응형 스타일 */
  @media (max-width: 768px) {
    .search__top {
      flex-direction: column;
      gap: 8px;
    }

    .infinite__div {
      min-height: 300px;
      margin-bottom: 20px;
      padding: 16px;
    }

    .contentStyle {
      height: 320px;
      width: 320px;
      max-width: 100%;
      border-radius: 6px;
    }
  }
`;
