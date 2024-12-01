import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { FaHome } from "react-icons/fa";
import { IoMdStats } from "react-icons/io";
import { IoMegaphoneOutline, IoNotifications, IoNotificationsOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import ProtectedContent from "../../ProtectedContent";
import React from "react";

{/* Find more icons */}
export default function CourseStatus() {
  return (
    <div id="wd-course-status" className="d-none d-xl-block m-4 mt-0" style={{ width: "300px" }}>
      <h2>Course Status</h2>
      <ProtectedContent role={['FACULTY']}>
        <div className="d-flex">
          <div className="w-50 pe-1">
            <button className="btn btn-md btn-secondary w-100 text-nowrap ">
              <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish </button>
          </div>
          <div className="w-50">
            <button className="btn btn-md btn-success w-100">
              <FaCheckCircle className="me-2 fs-5" /> Publish </button>
          </div>
        </div><br />
        <button className="btn btn-md btn-secondary w-100 mt-1 text-start">
          <BiImport className="me-2 fs-5" /> Import Existing Content </button>
        <button className="btn btn-md btn-secondary w-100 mt-1 text-start">
          <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons </button>
        <button className="btn btn-md btn-secondary w-100 mt-1 text-start">
          <FaHome className="me-2 fs-5" />
          Choose Home Page
        </button>
      </ProtectedContent>
      <button className="btn btn-md btn-secondary w-100 mt-1 text-start">
        <IoMdStats className="me-2 fs-5" />
        View Course Stream
      </button>
      <ProtectedContent role={['FACULTY']}>
        <button className="btn btn-md btn-secondary w-100 mt-1 text-start">
          <IoMegaphoneOutline className="me-2 fs-5" />
          New Annoucement
        </button>
      </ProtectedContent>
      <button className="btn btn-md btn-secondary w-100 mt-1 text-start">
        <IoMdStats className="me-2 fs-5" />
        New Analytics
      </button>
      <button className="btn btn-md btn-secondary w-100 mt-1 text-start">
        <IoNotificationsOutline className="me-2 fs-5" />
        View Course Notifications
      </button>
    </div>
);}