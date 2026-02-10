import React, { useEffect, useRef, useState } from "react";

interface VideoReproductorProps {
  src: string;
}

const VideoReproductor = ({ src }: VideoReproductorProps) => {
  //nos guardamos la referencia del reproductor en la variable

  //htmlvideelemnt es el elemonto de TS para poder referirnosa el
  const videRef = useRef<HTMLVideoElement>(null);

  //necesitamos una variable de estado que nos indique como esta el componente
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => setIsPlaying(!isPlaying);

  useEffect(() =>{
        if(isPlaying)videRef.current?.play();
        
        else videRef.current?.pause();
  },[isPlaying]);
  

  return  (
    <div style={{ maxWidth: "500px", margin: "20px auto", textAlign: "center" }}>
      <video
        ref={videRef}
        src={src}
        loop
        playsInline
        style={{ width: "100%", borderRadius: "10px", display: "block" }}
      />

      <div style={{ marginTop: "10px", display: "flex", gap: "10px", justifyContent: "center" }}>
        <button 
          onClick={togglePlay}
          className={`btn ${isPlaying ? 'btn-danger' : 'btn-primary'}`}
          style={{ minWidth: "120px" }}
        >
          {isPlaying ? "⏸️ Pausar" : "▶️ Reproducir"}
        </button>
      </div>
    </div>
  );
};

export default VideoReproductor;
