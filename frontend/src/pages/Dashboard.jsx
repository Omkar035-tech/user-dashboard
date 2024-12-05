import React from 'react'
import Header from '../components/Header'
import UserTable from '../components/UserTable'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    return (
        <div>
            <ToastContainer />
            <Header />
            <UserTable />
        </div>
    )
}

export default Dashboard