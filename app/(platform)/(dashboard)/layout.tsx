import { Navbar } from "./_components/Navbar";
import React from "react";

const DashboardLayout = ({
    children
} : {    children: React.ReactNode})=>{
        return(
            <div className="h-full w-full">
                <Navbar/>
                {children}
            </div>
        )

    };


export default DashboardLayout;
