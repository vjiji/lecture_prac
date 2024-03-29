import { createContext, useContext, useEffect, useState } from "react";
import { Loader } from "react-kakao-maps-sdk";

const MapContext = createContext();

const MapProvider = ({ children }) => {
  const [maps, setMaps] = useState("");

  const loadMap = async () => {
    try {
      const { maps } = await new Loader({
        appkey: "86874553357b6527726766923a3bde4c",
        libraries: ["services"],
      }).load();
      setMaps(maps);
    } catch (error) {
      console.log(error);
    } finally {
      // console.log("fetch data from server");
    }
  };

  useEffect(() => {
    loadMap();
  }, []);

  return <MapContext.Provider value={maps}>{children}</MapContext.Provider>;
};

export default MapProvider;

export const useMaps = () => useContext(MapContext);
