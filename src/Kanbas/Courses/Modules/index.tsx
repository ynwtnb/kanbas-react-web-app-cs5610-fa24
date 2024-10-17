import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function Modules() {
  const { cid } = useParams();
  const modules = db.modules;  
  return (
      <div>
        <ModulesControls /><br /><br /><br /><br />
        <ul id="wd-modules" className="list-group rounded-0">
          {modules.filter((module) => module.course === cid).map((module) => (
            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray border-1" key = {module._id}>
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                <span className="fw-bold">{module.name}</span>
                <ModuleControlButtons />
              </div>
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons && module.lessons.map(
                  (lesson) => (
                    <li className="wd-lesson list-group-item p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                      <LessonControlButtons />
                    </li>
                  )
                )}
              </ul>
            </li>
            )
          )}
        </ul>
      </div>
  );}
  
  