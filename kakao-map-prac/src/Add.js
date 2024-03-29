import React, { useState } from "react";
import { styled } from "styled-components";
import useMapStore from "./store/map";
import { useNavigate } from "react-router-dom";
import { useMaps } from "./useMaps";

const Add = () => {
  const navi = useNavigate();
  const { services } = useMaps();
  const [state, setState] = useState("");
  const { markers, setMarker } = useMapStore();

  const handleClickButton = () => {
    const { daum } = window;
    // 다음 주소찾기 창 실행 new daum.Postcode().open()
    new daum.Postcode({
      // oncomplete : 주소 선택 시 실행 함수
      oncomplete: function (data) {
        setState(data.address);
        // geocoder : 주소 => return 좌표, 지역 정보 geocoder.addressSearch(주소,콜백 함수)
        const geocoder = new services.Geocoder();
        const getXYFromAddress = (result, status) => {
          if (status === "OK") {
            console.log(result);
            setMarker({
              title: data.address,
              region: result[0].address.region_2depth_name,
              latlng: { lat: result[0].y, lng: result[0].x },
            });
          }
        };

        geocoder.addressSearch(data.address, getXYFromAddress);
      },
    }).open();
  };

  return (
    <>
      <Layout>
        <input value={state} disabled />
        <button onClick={handleClickButton}>주소 등록</button>
        <button onClick={() => navi("/")}>메인으로 가기</button>
      </Layout>
      {markers.map(({ title, region, latlng }) => (
        <MarkerBox key={`${region}_${latlng}`}>
          <p>{title}</p>
          <p>{region}</p>
          <span>{`${latlng.lat} / ${latlng.lng}`}</span>
        </MarkerBox>
      ))}
    </>
  );
};
export default Add;

const Layout = styled.div`
  display: flex;
  margin: 20px;
  gap: 20px;
  input {
    width: 300px;
  }

  button {
    width: 100px;
  }
`;

const MarkerBox = styled.div`
  margin-top: 20px;
  p {
    margin: 0;
  }
`;
