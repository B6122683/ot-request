import "./Pagenotfound.css";

function Pagenotfound() {
  return (
    <body>
      <div class="box" id="container">
        <div className="content">
          <h2 className="pagetitle">404</h2>
          </div>
          <p>Page Not Found</p>

          <a onClick={() => (window.location = "/")}>Back to home</a>
        
      </div>
    </body>
  );
}

export default Pagenotfound;
