import { useEffect } from "react";
import proj4 from "proj4";

const Dong = () => {
  const getDong = async () => {
    const res = await fetch(
      "https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json?accessToken=c8fa44f4-5894-42da-a027-a15d1b2f2f57&cd=11"
    );

    const { result } = await res.json();
    console.log(result);
  };
  var eps2097 =
    "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";

  var wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";

  console.log(proj4(eps2097, wgs84, [954293, 1954575]));

  useEffect(() => {
    getDong();
  }, []);
  return (
    <div>
      <button onClick={getDong}>get dong</button>
    </div>
  );
};

export default Dong;
