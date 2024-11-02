import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useParams } from "react-router";
import * as db from "../../Database";
import React, { useState } from "react";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import ProtectedContent from "../../ProtectedContent";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState<string>("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  return (
      <div>
        <ModulesControls setModuleName={setModuleName} moduleName={moduleName} 
          addModule={() => {
            dispatch(addModule({ name: moduleName, course: cid }));
            setModuleName("");
          }} /><br /><br /><br /><br />
        <ul id="wd-modules" className="list-group rounded-0">
          {modules.filter((module: any) => module.course === cid).map((module: any) => (
            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray border-1" key = {module._id}>
              <div className="wd-title p-3 ps-2 bg-secondary">
                <ProtectedContent role='FACULTY'><BsGripVertical className="me-2 fs-3" /></ProtectedContent>
                <span className="fw-bold">{!module.editing && module.name}</span>
                {module.editing && (
                  <input className="form-control w-50 d-inline-block"
                    onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }
                  }
                  defaultValue={module.name}/>   
                )}
                <ProtectedContent role='FACULTY'>
                  <ModuleControlButtons 
                    moduleId={module._id}
                    deleteModule={() =>dispatch(deleteModule(module._id))}
                    editModule={() => dispatch(editModule(module._id))} />
                </ProtectedContent>
              </div>
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons && module.lessons.map(
                  (lesson: any) => (
                    <li className="wd-lesson list-group-item p-3 ps-1">
                      <ProtectedContent role='FACULTY'><BsGripVertical className="me-2 fs-3" /></ProtectedContent>
                      {lesson.name}
                      <ProtectedContent role='FACULTY'>
                        <LessonControlButtons />
                      </ProtectedContent>
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
  
  