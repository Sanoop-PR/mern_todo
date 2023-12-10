import React from "react";
import "./notFound.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    // <div className="notFound">
    //   <div class="stripe">
    //     <div class="stripe_inner">NOT FOUND</div>
    //   </div>
    // </div>
    <div className="body">
      <section id="Background" class="Background">
        <div class="Square"></div>
      </section>
      <div class="glass-Box">
        <h1>4 ▢ 4</h1>
        <p>Oops! page not found</p>

        <a class="button" onClick={()=>navigate('/home')}>Back To Home</a>
      </div>
    </div>
  );
}

export default NotFound;
