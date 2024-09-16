import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS1234 React JS
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> <button> Go </button> </Link>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src="/images/health_tech.jpeg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to = "/Kanbas/Courses/5678/Home">
              HINF5678 Health technology design
            </Link>
            <p className="wd-dashboard-course-title">
              Health technology UI and UX design
            </p>
            <Link to="/Kanbas/Courses/5678/Home"> <button> Go </button> </Link>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src="/images/behavior_change.jpg" width = {200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to = "/Kanbas/Courses/1275/Home">
              HINF7725 Health theories
            </Link>
            <p className = "wd-dashboard-course-title">
              Health behavior change theories
            </p>
            <Link to="/Kanbas/Courses/7725/Home"> <button> Go </button> </Link>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src = "/images/python.png" width = {200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to = "/Kanbas/Courses/5463/Home">
                CS5463 Python        
            </Link>
            <p className="wd-dashboard-course-title">
              Python programming
            </p>
            <Link to="/Kanbas/Courses/5463/Home"> <button> Go </button> </Link>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src = "/images/health_data_analysis.jpeg" width = {200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to = "/Kanbas/Courses/5200/Home">
                HINF5200 Data analysis
            </Link>
            <p className = "wd-dashboard-course-title">
              Analysis and visualization of health data
            </p>
            <Link to="/Kanbas/Courses/5200/Home"> <button> Go </button> </Link>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src = "/images/app_dev.png" width = {200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to = "/Kanbas/Courses/5400/Home">
                CS5400 Mobile app development
            </Link>
            <p className="wd-dashboard-course-title">
              Mobile app development for iOS and Android
            </p>
            <Link to="/Kanbas/Courses/5400/Home"> <button> Go </button> </Link>
          </div>
          <div className="wd-dashboard-course">
            <img src = "/images/statistics.jpeg" width = {200} />
            <div>
              <Link className="wd-dashboard-course-link"
                to = "/Kanbas/Courses/7230/Home">
                  HINF7230 Statistics
              </Link>
              <p className = "wd-dashboard-course-title">
                Statistics for health data
              </p>
              <Link to="/Kanbas/Courses/7230/Home"> <button> Go </button> </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

