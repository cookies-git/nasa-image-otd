import React, { useState, useEffect } from "react";
import mainStyle from "../styles/main.module.css";
import ParticlesLoad from "./ParticlesLoad.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home(props) {
  const api_y = "wrqbpOm0kblm7zYbTWuwFAcRQUlPdPtf7L5E5Bmc";
  const dtToday = new Date();
  const dateMax = dtToday.toISOString().split("T")[0];

  const [dates, setDates] = useState("");
  const [data, setData] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    const date = event.target.value;
    setDates(date);
  }

  useEffect(() => {
    fetchData();
  }, [dates]);

  async function fetchData() {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${api_y}&date=${dates}`
    );
    const datas = await response.json();
    setData(datas);
  }
  
  return (
    <div className={mainStyle.body}>
      <ParticlesLoad />
      <div className={mainStyle.headDiv}>
        <h1 className={mainStyle.heading}>
          Search for NASA's Image of the day
        </h1>
        <p className={mainStyle.paraheadClass}>Pick a date</p>
        <input
          type="date"
          name="date"
          max={dateMax}
          onChange={(e) => handleSubmit(e)}
        />
      </div>
      {!data ? (
        <div className={mainStyle.loadingClas}>
          <img
            src="https://cdn.glitch.global/deb8de09-e82f-444a-9f81-0204868f2987/Eclipse-1s-200px(1).gif?v=1677221464650"
            alt="Loading..."
            className={mainStyle.loadingGif}
          />
        </div>
      ) : (
        <div className={mainStyle.dataClass}>
          <h3 className={mainStyle.titleClass}>{data.title}</h3>
          <img
            src={data.url}
            alt="Oops I'm not here!"
            className={mainStyle.imageCls}
          />
          <div className={mainStyle.desc}>
            <p className={mainStyle.picCopyright}>
              &copy; {data.copyright} &amp;
            </p>
            <p className={mainStyle.picDate}>Published date: {data.date}</p>
          </div>
          <p className={mainStyle.textClass}>{data.explanation}</p>
          <Link
            to={data.hdurl}
            target="_blank"
            className={mainStyle.linktoD}
            download
          >
            Download
          </Link>
        </div>
      )}
      <div className={mainStyle.footerStyle}>
        <p className={mainStyle.footerText}>
          Designed and Created by{" "}
          <Link
            to="https://github.com/sreesa29"
            target="_blank"
            className={mainStyle.footerLink}
          >
            Sree Sankar
          </Link>{" "}
          using <span className={mainStyle.nasaP}>NASA APIs</span>
        </p>
      </div>
    </div>
  );
}

export default Home;
