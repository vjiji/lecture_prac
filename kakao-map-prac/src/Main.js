import { useRef } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import useMapStore from "./store/map";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useState } from "react";
import { useMaps } from "./useMaps";
import { useEffect } from "react";

const Main = () => {
  const navi = useNavigate();
  // 생성된 마커 리스트
  const { markers } = useMapStore();
  // 현재 렌더링된 맵요소
  const map = useRef(null);

  const { LatLng, LatLngBounds } = useMaps();

  // 지역 선택 시 지역별 markers를 필터
  const [filteredMarkers, setFilteredMarkers] = useState(markers);

  // 지역 선택 시 마커리스트가 변경될 때 마다 맵의 위치를 다시 잡는다.
  useEffect(() => {
    if (!map.current) return;
    resetMapwithFilteredMarkers();
  }, [filteredMarkers]);

  const resetMapwithFilteredMarkers = () => {
    // 해당 지역에 마커가 없을 때 정책 필요
    if (!filteredMarkers.length) return;

    //마커리스트에서 좌표 정보만 모인 배열 생성
    const points = filteredMarkers.map(
      ({ latlng }) => new LatLng(latlng.lat, latlng.lng)
    );

    const bounds = new LatLngBounds();

    // 생성한 좌표 배열의 각 좌표 위치를 확인해 맵의 크기를 정한다.
    points.forEach((point) => bounds.extend(point));
    map.current.setBounds(bounds);
  };

  // 지역 필터 클릭 시 마커 정보 다시 조회 역할
  const handleChangeSelect = (e) => {
    if (e.currentTarget.value === "전체") {
      setFilteredMarkers(markers);

      return;
    }
    setFilteredMarkers(
      markers.filter(({ region }) => region === e.currentTarget.value)
    );
  };

  return (
    <Layout>
      <MainLayout>
        <FilterBox>
          <select onChange={handleChangeSelect}>
            <option>전체</option>
            <option>강남구</option>
            <option>종로구</option>
            <option>용산구</option>
          </select>
        </FilterBox>
        <Map
          ref={map}
          center={{ lat: 37.5667, lng: 126.9784 }}
          style={{
            width: "100%",
            height: "100%",
          }}
          level={10}
          maxLevel={3}
          minLevel={11}
        >
          {filteredMarkers.map(({ title, latlng }, i) => (
            <MapMarker
              key={`${latlng}_${title}`}
              title={title}
              image={{
                src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                size: {
                  width: 20,
                  height: 30,
                },
              }}
              position={latlng}
            />
          ))}
        </Map>
      </MainLayout>
      <button onClick={() => navi("/add")}>add</button>
    </Layout>
  );
};

export default Main;

const Layout = styled.div`
  display: flex;
  align-items: flex-start;
`;

const MainLayout = styled.div`
  width: 360px;
  height: 740px;
  position: relative;
`;

const FilterBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
  background: white;
  z-index: 99;
  margin: 10px;
  box-sizing: border-box;
`;
