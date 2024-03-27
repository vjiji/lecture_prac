import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef } from "react";

function App() {
  const { naver } = window;
  const mapElement = useRef(null);

  useEffect(() => {
    if (!mapElement.current || !naver) return;
    const location = new naver.maps.LatLng(37.5656, 126.9769);
    const location2 = new naver.maps.LatLng(37.555, 126.974);
    const center = new naver.maps.LatLng(37.6, 126.9);
    const mapOptions = {
      center: center,
      zoom: 10,
      mapType: "traffic",
      minZoom: 10,
      maxZoom: 18,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
    new naver.maps.Marker({
      position: location2,
      map,
    });

    naver.maps.Event.addListener(map, "click", function (e) {
      console.log(e);
    });
  }, []);

  return (
    <div className="App">
      <div ref={mapElement} style={{ minHeight: "400px" }} />
    </div>
  );
}

export default App;
