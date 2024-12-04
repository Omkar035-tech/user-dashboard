import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Info, MoreHorizontal } from "lucide-react";

const UserTable = () => {
    const [menuState, setMenuState] = useState(null);
    const menuRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [dataSet, setDataset] = useState([]);

    // format date Logics 

    const handleMenuClick = (rowId) => {
        setMenuState((prevState) => (prevState === rowId ? null : rowId));
    };

    const formatDateRelative = (createdAt) => {
        const createdDate = new Date(createdAt);
        const now = new Date();
        const diffInSeconds = Math.floor((now - createdDate) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} hours ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 30) return `${diffInDays} days ago`;
        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) return `${diffInMonths} months ago`;
        const diffInYears = Math.floor(diffInMonths / 12);
        return `${diffInYears} years ago`;
    };

    const formatExactDate = (createdAt) => {
        const options = { day: "numeric", month: "short", year: "numeric" };
        return new Date(createdAt).toLocaleDateString("en-US", options);
    };

    const CreatedAt = (createdAt) => {
        const relativeTime = formatDateRelative(createdAt);
        const exactDate = formatExactDate(createdAt);

        return (
            <div
                className=" text-slate-600"
            >
                <span className="text-sm ">{relativeTime}</span>
                <span className="cursor-pointer" title={exactDate}><Info className="inline-flex ml-2" size={18} /></span>
            </div>
        );
    };


    const handleOutsideClick = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuState(null);
        }
    };

    React.useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const data = [
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            dob: "1990-01-01",
            createdAt: "2023-12-01",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane.smith@example.com",
            dob: "1995-06-15",
            createdAt: "2023-12-02",
        },
    ];

    const handleActionClick = (action, id) => {
        console.log(`${action} clicked for ID ${id}`);
        setMenuState(null);
    };


    // Pagination Logic

    const fetchData = async (page) => {
        try {
            const response = await fetch(`https://api.example.com/data?page=${page}`);
            const result = await response.json();
            setDataset(result.entries);
            setTotalPages(result.totalPages);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="table-container  px-5">
            <table border="1" className="w-full border-collapse">
                <thead className="text-start bg-slate-200">
                    <tr>
                        <th className="text-start py-2">ID</th>
                        <th className="text-start py-2">Name</th>
                        <th className="text-start py-2">Email</th>
                        <th className="text-start py-2">DOB</th>
                        <th className="text-start py-2">Created At</th>
                        <th className="text-start py-2"></th>
                    </tr>
                </thead>
                <tbody className="max-h-44">
                    {data.map((row) => (

                        <tr key={row.id} className="border-b border-slate-400/20">
                            <td className="py-2">{row.id}</td>
                            <td className="py-2">{row.name}</td>
                            <td className="py-2">{row.email}</td>
                            <td className="py-2">{formatExactDate(row.dob)}</td>
                            <td className="py-2 text-slate-600">{CreatedAt(row.createdAt)}</td>
                            <td className="py-2">
                                <div className="relative">
                                    <MoreHorizontal
                                        onClick={() => handleMenuClick(row.id)}
                                        className={menuState === row.id ? "border-2 border-slate-400 bg-slate-200 rounded-md px-0.5 cursor-pointer" : "cursor-pointer "}
                                    />
                                    {menuState === row.id && (
                                        <div
                                            ref={menuRef}
                                            className="absolute top-1 right-12 bg-slate-50 shadow-md border border-slate-500/15 rounded-md z-20"
                                        >
                                            <ul
                                                className="list-none m-0 px-1 py-0"
                                            >
                                                <li
                                                    className="px-1.5 py-3 cursor-pointer border-b border-b-slate-400/25"
                                                    onClick={() => handleActionClick("Update", row.id)}
                                                >
                                                    Update
                                                </li>
                                                <li className="px-1.5 py-3 cursor-pointer border-b border-b-slate-400/25"
                                                    onClick={() => handleActionClick("Delete", row.id)}
                                                >
                                                    Delete
                                                </li>
                                                <li
                                                    className="px-1.5 py-3 cursor-pointer "
                                                    onClick={() => setMenuState(null)}
                                                >
                                                    Cancel
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="text-base py-3 flex justify-between items-center">
                <div>
                    <span className="mr-2">
                        Row Per Page:
                    </span>
                    <select name="" id="" className="bg-transparent rounded-md border-slate-400/40 border-2">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                </div>
                <div>
                    <div className="flex items-center justify-center mt-4 space-x-2">
                        <button
                            className="px-3 py-2 bg-gray-200 text-gray-600 rounded disabled:opacity-50"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            <ChevronLeft size={18} />
                        </button>
                        {currentPage > 1 && (
                            <button
                                className="px-3 py-1 bg-gray-200 text-gray-600 rounded"
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                {currentPage - 1}
                            </button>
                        )}
                        <button className="px-3 py-1 bg-blue-500 text-white rounded">
                            {currentPage}
                        </button>
                        {currentPage < totalPages && (
                            <button
                                className="px-3 py-1 bg-gray-200 text-gray-600 rounded"
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                {currentPage + 1}
                            </button>
                        )}
                        {currentPage < totalPages - 2 && <span className="px-3">...</span>}
                        <button
                            className="px-3 py-2 bg-gray-200 text-gray-600 rounded disabled:opacity-50"
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserTable;
