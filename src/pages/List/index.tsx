import { Button, Carousel, Collapse, DatePicker, Spin } from "antd";
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

  const fetchData = (page: number, reset = false) => {
    if (isFetching) return;
    setIsFetching(true);

    fetchBoardList(
      { page, size, strDt, endDt },
      {
        onSuccess: (res: any) => {
          setBoards((prevBoards: any) =>
            reset ? res.data.boardList : [...prevBoards, ...res.data.boardList]
          );
          setTotalBoards(res.data.totalCount);
          setIsFetching(false);
        },
        onError: () => setIsFetching(false),
      }
    );
  };

  useEffect(() => {
    fetchData(1, true);
  }, [strDt, endDt]);

  const handleLoadMore = () => {
    if (boards.length >= totalBoards) return;
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchData(nextPage);
      return nextPage;
    });
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
      {/* 검색 필터 */}
      <div className="search__top">
        <DatePicker.RangePicker
          status="warning"
          style={{ width: "100%" }}
          onCalendarChange={handleCalendarChange}
        />
        <Button
          type="primary"
          onClick={() => fetchData(1, true)}
          className="search__button"
        >
          검색
        </Button>
      </div>

      {/* 무한 스크롤 */}
      <InfiniteScroll
        dataLength={boards.length}
        next={handleLoadMore}
        hasMore={boards.length < totalBoards}
        loader={<Spin indicator={<LoadingOutlined spin />} />}
        endMessage={
          <p style={{ textAlign: "center" }}>표시할 데이터가 없습니다</p>
        }
        className="infiniteScroll"
      >
        {boards.map((board: any) => (
          <div key={board.boardId} className="infinite__div">
            <Collapse
              items={[
                {
                  key: board.boardId.toString(),
                  label: board.boardTitle,
                  children: (
                    <p style={{ whiteSpace: "pre-line" }}>
                      {board.boardContent}
                    </p>
                  ),
                },
              ]}
            />

            {/* 파일 (이미지 / 비디오) */}
            <Carousel arrows infinite={false}>
              {board.files?.map((file: any) => {
                const isVideo = ["mp4", "mov", "wmv", "avi"].includes(
                  file.fileExt.toLowerCase()
                );

                return isVideo ? (
                  <video key={file.fileId} controls width="100%" height="100%">
                    <source
                      src={`data:video/${file.fileExt};base64,${file.fileData}`}
                      type={`video/${file.fileExt}`}
                    />
                    지원하지 않는 비디오 형식입니다.
                  </video>
                ) : (
                  <img
                    key={file.fileId}
                    src={`data:image/${file.fileExt};base64,${file.fileData}`}
                    alt="filedata"
                    className="carousel-img"
                  />
                );
              })}
            </Carousel>
          </div>
        ))}
      </InfiniteScroll>
    </StyledList>
  );
};

export default List;
