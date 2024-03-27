import { useState } from "react";
import "./App.css";
import { Map } from "react-kakao-maps-sdk";
import { useKakaoLoader } from "react-kakao-maps-sdk";

function App() {
  useKakaoLoader();
  const [state, setState] = useState({
    center: { lat: 33.450701, lng: 126.570667 },
    isPanto: false,
  });

  return (
    <div className="App">
      <div>
        <Map
          center={state.center}
          isPanto={state.isPanto}
          style={{
            // 지도의 크기
            width: "100%",
            height: "350px",
          }}
          level={3}
        />
      </div>

      <button
        onClick={() =>
          setState({
            center: { lat: 33.452613, lng: 126.570888 },
            isPanto: false,
          })
        }
      >
        move test
      </button>
      <button
        onClick={() =>
          setState({
            center: { lat: 33.452613, lng: 126.570888 },
            isPanto: true,
          })
        }
      >
        panto test
      </button>
    </div>
  );
}

export default App;
