import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import configDark from "./particle-json.json";
import mainStyle from "../styles/main.module.css";


const ParticlesLoad = () => {
    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
    }, []);

    return (
      <div className={mainStyle.particleDiv}>
        <Particles init={particlesInit} loaded={particlesLoaded} options= {configDark} /> 
      </div>
);
};
export default ParticlesLoad;
