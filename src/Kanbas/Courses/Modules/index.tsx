import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import {
	setModules,
	addModule,
	editModule,
	updateModule,
	deleteModule,
} from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import ProtectedContent from "../../ProtectedContent";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
	const { cid } = useParams();
	const [moduleName, setModuleName] = useState<string>("");
	const { modules } = useSelector((state: any) => state.modulesReducer);
	const dispatch = useDispatch();
	const fetchModules = async () => {
		const modules = await coursesClient.findModulesForCourse(cid as string);
		dispatch(setModules(modules));
	};
	useEffect(() => {
		fetchModules();
	}, []);
	const createModuleForCourse = async () => {
		if (!cid) return;
		const newModule = { name: moduleName, course: cid };
		const module = await coursesClient.createModuleForCourse(cid, newModule);
		dispatch(addModule(module));
	};
	const removeModule = async (moduleId: string) => {
		await modulesClient.deleteModule(moduleId);
		dispatch(deleteModule(moduleId));
	};
	const saveModule = async (module: any) => {
		await modulesClient.updateModule(module);
		dispatch(updateModule(module));
	};
	return (
		<div>
			<ModulesControls
				setModuleName={setModuleName}
				moduleName={moduleName}
				addModule={createModuleForCourse}
			/>
			<br />
			<br />
			<br />
			<br />
			<ul id="wd-modules" className="list-group rounded-0">
				{modules.map((module: any) => (
					<li
						className="wd-module list-group-item p-0 mb-5 fs-5 border-gray border-1"
						key={module._id}
					>
						<div className="wd-title p-3 ps-2 bg-secondary overflow-hidden">
							<ProtectedContent role={["FACULTY"]}>
								<BsGripVertical className="me-2 fs-3" />
							</ProtectedContent>
							<span className="fw-bold">{!module.editing && module.name}</span>
							{module.editing && (
								<input
									className="form-control w-50 d-inline-block"
									onChange={(e) =>
										dispatch(updateModule({ ...module, name: e.target.value }))
									}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											saveModule({ ...module, editing: false });
										}
									}}
									defaultValue={module.name}
								/>
							)}
							<ProtectedContent role={["FACULTY"]}>
								<ModuleControlButtons
									moduleId={module._id}
									deleteModule={(moduleId) => removeModule(moduleId)}
									editModule={() => dispatch(editModule(module._id))}
								/>
							</ProtectedContent>
						</div>
						<ul className="wd-lessons list-group rounded-0  text-nowrap">
							{module.lessons &&
								module.lessons.map((lesson: any) => (
									<li className="wd-lesson list-group-item p-3 ps-1">
										<ProtectedContent role={["FACULTY"]}>
											<BsGripVertical className="me-2 fs-3" />
										</ProtectedContent>
										{lesson.name}
										<ProtectedContent role={["FACULTY"]}>
											<LessonControlButtons />
										</ProtectedContent>
									</li>
								))}
						</ul>
					</li>
				))}
			</ul>
		</div>
	);
}
