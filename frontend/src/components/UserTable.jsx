import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Info, MoreHorizontal, Pencil, Plus, SearchIcon, Trash, Upload } from "lucide-react";
import Modal from "./Modal";
const UserTable = () => {
    const [menuState, setMenuState] = useState(null);
    const menuRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [dataSet, setDataset] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [schema, setSchema] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    // Modal Setup 

    const formSchema = {
        fields: [
            { label: "First Name", type: "text", name: "firstname" },
            { label: "Last Name", type: "text", name: "lastname" },
            { label: "Email", type: "email", name: "email" },
            { label: "Password", type: "password", name: "password" },
            { label: "Date of Birth", type: "date", name: "dob", min: "1985-01-01", max: "2015-12-31" },
        ],
        buttons: [
            { label: "Add", bg: "bg-green-500", action: "add" },
            { label: "Cancel", bg: "bg-gray-400", action: "cancel" },
        ],
    };

    const updateSchema = {
        fields: [
            { label: "First Name", type: "text", name: "firstname" },
            { label: "Last Name", type: "text", name: "lastname" },
            { label: "Email", type: "email", name: "email" },
            { label: "Password", type: "password", name: "password" },
            { label: "Date of Birth", type: "date", name: "dob", min: "1985-01-01", max: "2015-12-31" },
        ],
        buttons: [
            { label: "Update", bg: "bg-blue-500", action: "update" },
            { label: "Cancel", bg: "bg-gray-400", action: "cancel" },
        ],
    };

    const deleteSchema = {
        message: "Are you sure you want to delete this user?",
        buttons: [
            { label: "Yes, Delete", bg: "bg-red-500", action: "delete" },
            { label: "Cancel", bg: "bg-gray-400", action: "cancel" },
        ],
    };

    const fileUploadSchema = {
        fields: [
            { label: "Upload Excel/CSV", type: "file", name: "file", accept: ".xlsx,.csv" },
        ],
        buttons: [
            { label: "Upload", bg: "bg-green-500", action: "upload" },
            { label: "Cancel", bg: "bg-gray-400", action: "cancel" },
        ],
    };

    const handleOpenModal = (schemaType, user = null) => {
        console.log(user)
        const schemaMap = {
            add: formSchema,
            update: updateSchema,
            delete: deleteSchema,
            upload: fileUploadSchema,
        };
        setSelectedUser(user);
        setIsModalOpen(true);
        setSchema(schemaMap[schemaType]);
    };

    const handleApiAction = (action, data) => {
        console.log(`API action triggered: ${action}`);
        console.log("Data submitted:", data);

        switch (action) {
            case "add":
                console.log("Calling add user API...");
                break;
            case "update":
                console.log("Calling update user API...");
                break;
            case "delete":
                console.log("Calling delete user API...");
                break;
            case "upload":
                console.log("Calling file upload API...");
                break;
            default:
                console.log("Unknown action");
        }
        setIsModalOpen(false);
    };

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuState(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const data = [
        {
            id: 1,
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@example.com",
            dob: "1990-01-01",
            createdAt: "2023-12-01",
        },
        {
            id: 2,
            firstname: "John",
            lastname: "Smit",
            email: "jane.smith@example.com",
            dob: "1995-06-15",
            createdAt: "2023-12-02",
        },
    ];

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
        <div >
            <div className='flex items-center justify-between mx-5 my-4'>

                <button onClick={() => handleOpenModal("add")} className='flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'><Plus size={18} className='inline-flex mr-1.5' /> Add new user</button>
                <div className='flex gap-3'>
                    <button onClick={() => handleOpenModal("upload")} className='flex justify-center items-center border-2 rounded-md px-3 py-1 hover:bg-black hover:text-white transition-all duration-300 border-slate-300'><Upload size={18} className='inline-flex mr-1.5' /> Upload Excel/csv</button>
                    <button className='flex justify-center items-center border-2 rounded-md px-3 py-1 hover:bg-black hover:text-white transition-all duration-300 border-slate-300'><SearchIcon size={18} className='inline-flex mr-1.5' /> Search</button>
                </div>

            </div>
            <hr className='h-[1.5px] bg-slate-300 mx-5' />
            <div className="px-5">
                <table className="w-full border-collapse">
                    <thead className="text-start bg-slate-200 uppercase hidden md:table-header-group">
                        <tr>
                            <th className="text-start py-2">ID</th>
                            <th className="text-start py-2">Name</th>
                            <th className="text-start py-2">Email</th>
                            <th className="text-start py-2">DOB</th>
                            <th className="text-start py-2">Created At</th>
                            <th className="text-start py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr
                                key={row.id}
                                className="border-b border-slate-400/20 flex flex-col md:table-row py-4 md:py-0relative"
                            >
                                <td className="hidden md:table-cell py-2 ">{row.id}</td>
                                <td className="hidden md:table-cell py-2 ">{row.firstname + " " + row.lastname}</td>
                                <td className="hidden md:table-cell py-2 ">{row.email}</td>
                                <td className="hidden md:table-cell py-2 ">
                                    {formatExactDate(row.dob)}
                                </td>
                                <td className="hidden md:table-cell py-2  text-slate-600">
                                    {CreatedAt(row.createdAt)}
                                </td>
                                <td className="hidden md:table-cell py-2">

                                    <div className="">
                                        <button className="mx-2 bg-blue-600 px-1.5 rounded-md text-white py-1" onClick={() => handleOpenModal("update", row)}><Pencil size={18} /></button>
                                        <button className="mx-2 bg-red-500 px-1.5 rounded-md text-white py-1" onClick={() => handleOpenModal("delete", row)}><Trash size={18} /></button>
                                    </div>
                                </td>
                                <td
                                    className="md:hidden flex flex-col gap-2 p-4 before:font-bold before:text-slate-600"
                                >
                                    <span
                                        className="md:hidden before:content-['ID:'] before:mr-2 before:font-semibold flex justify-between items-center"
                                    >
                                        {row.id}
                                    </span>
                                    <span
                                        className="md:hidden before:content-['Name:'] before:mr-2 before:font-semibold flex justify-between items-center"
                                    >
                                        {row.name}
                                    </span>
                                    <span
                                        className="md:hidden before:content-['Email:'] before:mr-2 before:font-semibold flex justify-between items-center"
                                    >
                                        {row.email}
                                    </span>
                                    <span
                                        className="md:hidden before:content-['DOB:'] before:mr-2 before:font-semibold flex justify-between items-center"
                                    >
                                        {formatExactDate(row.dob)}
                                    </span>
                                    <span
                                        className="md:hidden before:content-['Created_At:'] before:mr-2 before:font-semibold flex justify-between items-center"
                                    >
                                        {CreatedAt(row.createdAt)}
                                    </span>
                                    <span
                                        className=" relative md:hidden before:content-['Actions:'] before:mr-2 before:font-semibold flex justify-between items-center"
                                    >
                                        <div className="md:hidden flex justify-end items-center">
                                            <MoreHorizontal
                                                onClick={() => handleMenuClick(row.id)}
                                                className={
                                                    menuState === row.id
                                                        ? "border-2 border-slate-400 bg-slate-200 rounded-md px-0.5 cursor-pointer"
                                                        : "cursor-pointer"
                                                }
                                            />
                                            {menuState === row.id && (
                                                <div
                                                    ref={menuRef}
                                                    className="absolute top-1 right-8 bg-slate-50 shadow-md border border-slate-500/15 rounded-md z-20"
                                                >
                                                    <ul className="list-none m-0 px-1 py-0">
                                                        <li
                                                            className="px-1.5 py-3 cursor-pointer border-b border-b-slate-400/25"
                                                            onClick={() => handleOpenModal("update", row)}
                                                        >
                                                            Update
                                                        </li>
                                                        <li
                                                            className="px-1.5 py-3 cursor-pointer border-b border-b-slate-400/25"
                                                            onClick={() => handleOpenModal("delete", row)}
                                                        >
                                                            Delete
                                                        </li>
                                                        <li
                                                            className="px-1.5 py-3 cursor-pointer"
                                                            onClick={() => setMenuState(null)}
                                                        >
                                                            Cancel
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </span>

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

            {isModalOpen && (
                <Modal
                    schema={schema}
                    onClose={() => setIsModalOpen(false)}
                    onAction={handleApiAction}
                />
            )}

        </div>
    );
};

export default UserTable;


