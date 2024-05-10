import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import BlogCraftLogo from "../assets/BlogCraft-mainlogo.jpeg";

export function Navbar() {
    const [isAuth, setIsAuth] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setIsAuth(true);
        }
    }, []);

    function HandleSignout() {
        localStorage.removeItem("token");
        localStorage.removeItem("author");
        setIsAuth(false);
        navigate("/");
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 shadow-md bg-white  z-50">
                <div className="py-4 px-4 sm:px-8 lg:px-12">
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <Link to="/">
                                {" "}
                                <img
                                    src={BlogCraftLogo}
                                    alt=""
                                    className=" h-10"
                                />{" "}
                            </Link>
                        </div>
                        <div className="flex md:hidden items-center">
                            {menuOpen ? (
                                <XMarkIcon
                                    className="block h-8 w-8 text-blue-500"
                                    aria-hidden="true"
                                    onClick={toggleMenu}
                                />
                            ) : (
                                <Bars3Icon
                                    className="block h-8 w-8 text-blue-500"
                                    aria-hidden="true"
                                    onClick={toggleMenu}
                                />
                            )}
                        </div>
                        <div
                            className={` md:relative md:flex md:flex-row md:justify-end md:gap-7 md:items-center md:pb-0 md:pr-0  text-black text-lg font-semibold   ${menuOpen ? "flex flex-col bg-white shadow-md items-end gap-4 absolute top-[100%] left-0 w-full pb-4 pr-4 sm:pr-8" : "hidden"}`}
                        >
                            {isAuth ? (
                                <>
                                    <Link
                                        to="/myblogs"
                                        className="hover:text-blue-600 transition-colors"
                                    >
                                        myblogs
                                    </Link>
                                    <Link
                                        to="/createBlog"
                                        className="hover:text-blue-600 transition-colors"
                                    >
                                        createblog
                                    </Link>
                                    <Link
                                        to="/"
                                        onClick={HandleSignout}
                                        className="hover:text-blue-600 transition-colors"
                                    >
                                        Signout
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/signin"
                                        className="hover:text-blue-600 transition-colors"
                                    >
                                        Signin
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="hover:text-blue-600 transition-colors"
                                    >
                                        Signup
                                    </Link>
                                </>
                            )}
                            <button className="flex gap-2 items-center border-2 border-blue-600 py-2 w-36 justify-center rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M12 .297C5.4.297 0 5.71 0 12.305c0 5.398 3.438 9.977 8.207 11.609.6.11.793-.258.793-.576 0-.284-.01-1.035-.015-2.032-3.348.726-4.05-1.625-4.05-1.625-.547-1.387-1.336-1.756-1.336-1.756-1.094-.746.083-.73.083-.73 1.207.086 1.842 1.24 1.842 1.24 1.07 1.836 2.805 1.305 3.49.998.108-.777.42-1.305.764-1.605-2.672-.305-5.48-1.336-5.48-5.93 0-1.31.465-2.385 1.235-3.23-.124-.304-.535-1.527.117-3.18 0 0 1.008-.324 3.3 1.23.957-.266 1.98-.399 3-.405 1.02.006 2.043.139 3 .405 2.29-1.554 3.297-1.23 3.297-1.23.656 1.653.243 2.876.12 3.18.77.845 1.23 1.92 1.23 3.23 0 4.608-2.816 5.62-5.495 5.92.432.372.81 1.103.81 2.22 0 1.605-.015 2.895-.015 3.29 0 .318.192.694.8.574C20.57 22.28 24 17.7 24 12.305 24 5.71 18.6.297 12 .297z" />
                                </svg>

                                <Link
                                    to="https://github.com/VamsiPunnaReddy/Blog-App_MERN"
                                    className="text-blue-600 transition-colors"
                                >
                                    Git Repo
                                </Link>
                            </button>

                        </div>
                    </div>
                </div>
            </nav>
            <div className=" pt-20"></div>
            <Outlet />
        </>
    );
}

/* nav-links ===> myblogs, createBlog, Signin/Signup, Signout */

