import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { IoBan, IoBanOutline } from "react-icons/io5";
import ModuleEditor from "./ModuleEditor";
import ProtectedContent from "../../ProtectedContent";

export default function ModulesControls( { moduleName, setModuleName, addModule } : {
    moduleName: string; setModuleName: (title: string) => void; addModule: () => void;
}) {
    return (
        <div id="wd-modules-controls" className="text-nowrap">
            <ProtectedContent role='FACULTY'>
                <button id="wd-add-module-btn" className="btn btn-md btn-danger me-1 float-end"
                    data-bs-toggle="modal" data-bs-target="#wd-add-module-dialog">
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Module</button>
            </ProtectedContent>
            <ProtectedContent role='FACULTY'>
                <div className="dropdown d-inline me-1 float-end">
                    <button id="wd-publish-all-btn" className="btn btn-md btn-secondary dropdown-toggle"
                        type="button" data-bs-toggle="dropdown">
                        <GreenCheckmark />Publish All</button>
                    <ul className="dropdown-menu">
                        <li>
                            <a id="wd-publish-all-modules-and-items-btn" className="dropdown-item" href="#">
                            <GreenCheckmark />
                            Publish all modules and items</a>
                        </li>
                        <li>
                            <a id="wd-publish-modules-only-button" className="dropdown-item" href="#">
                            <GreenCheckmark />
                            Publish modules only</a>
                        </li>
                        <li>
                            <a id = "wd-unpublish-all-modules-and-items" className="dropdown-item" href="#">
                            <IoBanOutline className="fs-5 me-1"/>
                            Unpublish all modules and items</a>
                        </li>
                        <li>
                            <a id = "wd-unpublish-modules-only" className="dropdown-item" href="#">
                            <IoBanOutline className="fs-5 me-1"/>
                            Unpublish modules only</a>
                        </li>
                    </ul>
                </div>
            </ProtectedContent>
            <ProtectedContent role='FACULTY'>    
                <button id = "wd-view-progress" className="btn btn-md btn-secondary float-end me-1">
                    View Progress
                </button>
            </ProtectedContent>
            <button id = "wd-collapse-all" className="btn btn-md btn-secondary float-end me-1">
                Collapse All
            </button>
            <ModuleEditor dialogTitle="Add Module" moduleName={moduleName}
                    setModuleName={setModuleName} addModule={addModule} />
        </div>
);}

