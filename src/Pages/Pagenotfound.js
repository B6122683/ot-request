import "./Pagenotfound.css";

function Pagenotfound() {
  return (
    <div class="box" id="container">
      <div className="content">
        <h2 className="pagetitle">404</h2>
      <p>Page Not Found</p>

      <a onClick={() => (window.location = "/")}>Back to home</a>
      
      </div>
      
      
    </div>
  );
}

export default Pagenotfound;
