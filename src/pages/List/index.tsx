import {
  Button,
  Carousel,
  Collapse,
  DatePicker,
  DatePickerProps,
  Spin,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetBoardList } from "services/api/useGetBoardList";
import { StyledList } from "styles/liststyle";
import { BoardType } from "types";

const List = () => {
  const { mutate: fetchBoardList } = useGetBoardList();

  const [page, setPage] = useState(1);
  const [size] = useState(3);
  const [boards, setBoards] = useState<any>([]);
  const [totalBoards, setTotalBoards] = useState(0);
  const [strDt, setStrDt] = useState<string>("");
  const [endDt, setEndDt] = useState<string>("");
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = (page: number) => {
    if (isFetching) return;
    setIsFetching(true);

    fetchBoardList(
      { page, size, strDt, endDt },
      {
        onSuccess: (res: any) => {
          setBoards((prevBoards: any) => [
            ...prevBoards,
            ...res.data.boardList,
          ]);
          setTotalBoards(res.data.totalCount);
          setIsFetching(false);
        },
        onError: () => {
          setIsFetching(false);
        },
      }
    );
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const handleLoadMore = () => {
    if (boards.length >= totalBoards) return;

    setTimeout(() => {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchData(nextPage);
        return nextPage;
      });
    }, 500);
  };

  const handleCalendarChange = (
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null],
    dateStrings: [string, string]
  ) => {
    setStrDt(dateStrings[0]);
    setEndDt(dateStrings[1]);
  };

  return (
    <StyledList>
      <div className="search__top">
        <DatePicker.RangePicker
          status="warning"
          style={{ width: "100%" }}
          onCalendarChange={handleCalendarChange}
        />
        <Button
          type="primary"
          onClick={() => {
            setBoards([]);
            fetchData(1);
          }}
          className="search__button"
        >
          검색
        </Button>
      </div>
      <InfiniteScroll
        dataLength={boards.length}
        next={handleLoadMore}
        hasMore={boards.length < totalBoards}
        loader={<Spin indicator={<LoadingOutlined spin />} />}
        endMessage={
          <p style={{ textAlign: "center" }}>표시할 데이터가 없습니다</p>
        }
        style={{ width: "100%", height: "100%", margin: 0 }}
      >
        {boards.map((board: any) => (
          <div key={board.boardId} className="infinite__div">
            <Collapse
              items={[
                {
                  key: board.boardId.toString(), // key를 고유한 값으로 설정
                  label: board.boardTitle, // 제목을 패널 헤더로 사용
                  children: <p>{board.boardContent}</p>, // 내용 표시
                },
              ]}
            />
            <Carousel arrows infinite={false} className="contentStyle">
              <img src={boards.filedata} alt="filedata" className="" />
              <img src={boards.filedata} alt="filedata" className="" />
              <img src={boards.filedata} alt="filedata" className="" />
            </Carousel>
          </div>
        ))}
      </InfiniteScroll>
    </StyledList>
  );
};

export default List;
