import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { IoBan, IoBanOutline } from "react-icons/io5";

export default function ModulesControls() {
    return (
        <div id="wd-modules-controls" className="text-nowrap">
            <button id="wd-add-module-btn" className="btn btn-md btn-danger me-1 float-end">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Module</button>
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
            <button id = "wd-view-progress" className="btn btn-md btn-secondary float-end me-1">
                View Progress
            </button>
            <button id = "wd-collapse-all" className="btn btn-md btn-secondary float-end me-1">
                Collapse All
            </button>
        </div>
);}

