import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          <div className="wd-dashboard-course col" style={{ width: "270px" }}>
            <div className="card rounded-3 overflow-hidden h-100">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
                <img src="/images/reactjs.jpg" width="100%" height = {140} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title text-nowrap text-truncate">CS1234 React JS</h5>
                  <p className="wd-dashboard-course-title card-text text-nowrap text-truncate">
                    Full Stack software developer
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "270px" }}>
            <div className="card rounded-3 overflow-hidden">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                  to = "/Kanbas/Courses/5678/Home">
                <img src="/images/health_tech.jpeg" width="100%" height = {140} />
                <div className="card-body">  
                  <h5 className="wd-dashboard-course-title card-title text-nowrap text-truncate">HINF5678 Health technology design</h5>
                    <p className="wd-dashboard-course-title card-text text-nowrap text-truncate">
                      Health technology UI and UX design
                    </p>
                    <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "270px" }}>
            <div className="card rounded-3 overflow-hidden h-100">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to = "/Kanbas/Courses/1275/Home">
                <img src="/images/behavior_change.jpg" width = "100%" height = {140} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title text-nowrap text-truncate">HINF7725 Health theories</h5>
                  <p className = "wd-dashboard-course-title card-text text-nowrap text-truncate">
                    Health behavior change theories
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "270px" }}>
            <div className="card rounded-3 overflow-hidden h-100">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to = "/Kanbas/Courses/5463/Home">
                <img src = "/images/python.png" width = "100%" height = {140} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title text-nowrap text-truncate">CS5463 Python</h5>
                  <p className="wd-dashboard-course-title card-text text-nowrap text-truncate">
                    Python programming
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "270px" }}>
            <div className="card rounded-3 overflow-hidden h-100">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to = "/Kanbas/Courses/5200/Home">
                <img src = "/images/health_data_analysis.jpeg" width = "100%" height = {140} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title text-nowrap text-truncate">HINF5200 Data analysis</h5>
                  <p className = "wd-dashboard-course-title card-text text-nowrap text-truncate">
                    Analysis and visualization of health data
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "270px" }}>
            <div className="card rounded-3 overflow-hidden h-100">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to = "/Kanbas/Courses/5400/Home">
                <img src = "/images/app_dev.png" width = "100%" height = {140} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title text-nowrap text-truncate">CS5400 Mobile app development</h5>
                  <p className="wd-dashboard-course-title card-text text-nowrap text-truncate">
                    Mobile app development for iOS and Android
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "270px" }}>
            <div className="card rounded-3 overflow-hidden h-100">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to = "/Kanbas/Courses/7230/Home">
                <img src = "/images/statistics.jpeg" width = "100%" height = {140} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title text-nowrap text-truncate">HINF7230 Statistics</h5>
                  <p className = "wd-dashboard-course-title card-text text-nowrap text-truncate">
                    Statistics for health data
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

