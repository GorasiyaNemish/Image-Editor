import { useState, useEffect, useRef } from "react";
import "./App.css";
import { DATA } from "../src/constant/constant.js";
import FilterItem from "./componenets/filterItem.jsx";
import { INITIAL_STYLE } from "../src/constant/constant.js";

function App() {
  const [image, setImage] = useState("");
  const [styleToApply, setStyle] = useState(INITIAL_STYLE);
  const inputRef = useRef();
  const [ff, setff] = useState({});
  const handleUploadImage = (event) => {
    setImage(() => URL.createObjectURL(event.target.files[0]));
  };

  const handleChangeStyle = (filterName, data, unit) => {
    setStyle((prevStyle) => ({ ...prevStyle, [filterName]: data + unit }));
  };
  const handleDeleteImage = () => {
    // inputRef.current.value = "";
    setImage(null);
  };
  let str = "";
  useEffect(() => {
    for (const [key, value] of Object.entries(styleToApply)) {
      str += `${key}(${value}) `;
    }
    setff((prev) => ({ ...prev, filter: str }));
  }, [styleToApply]);

  // console.log({ ...ff });
  const st = ff.filter;
  return (
    <div className="main">
      {image ? (
        <>
          <div className="imageDiv">
            {console.log(ff.filter)}
            <img style={{ opacity: st }} src={image} alt="Drop image here.." />
            <button onClick={handleDeleteImage}>Delete</button>
          </div>
          <div className="editing">
            {DATA.map((filter) => (
              <FilterItem
                data={filter}
                key={filter.filterName}
                handleChangeStyle={handleChangeStyle}
              />
            ))}
          </div>
        </>
      ) : (
        <input
          ref={inputRef}
          type="file"
          onChange={handleUploadImage}
          accept="image/png, image/gif, image/jpeg"
        />
      )}
    </div>
  );
}

export default App;
