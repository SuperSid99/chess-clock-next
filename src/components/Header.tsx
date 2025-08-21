"use client";
import Link from "next/link";
import { IoHomeOutline, IoCogOutline, IoDocumentOutline, IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";

export default function Header() {
  return (
    <header className="header">
      <div className="row header_pt1">
        <h1 className="main_heading">Chess Clock</h1>
      </div>
      <div className="row header_pt2">
        <ul className="social_media">
          <li><Link className="btn btn_icon" href="https://siddharthsharma.dev/"><IoHomeOutline /></Link></li>
          <li><Link className="btn btn_icon" href="https://siddharthsharma.dev/projects"><IoCogOutline /></Link></li>
          <li>
            <a className="btn btn_icon" href="https://siddharthsharma.dev/Siddharth_Sharma_Resume.pdf" target="_blank" rel="noopener">
              <IoDocumentOutline />
            </a>
          </li>
          <li>
            <a className="btn btn_icon" href="https://github.com/SuperSid99" target="_blank" rel="noopener">
              <IoLogoGithub />
            </a>
          </li>
          <li>
            <a className="btn btn_icon" href="https://www.linkedin.com/in/siddharth-sharma-ba30051a1/" target="_blank" rel="noopener">
              <IoLogoLinkedin />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
