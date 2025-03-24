import NavBar from "../../Components/NavBar/NavBar";
import Header from "../../Components/Header/Header";
import React from "react";

const Base = ({ children, title, subTitle }) => {
    return (
        <>
            <div className="flex flex-row">
                <div className="bg-primary shadow-2xl rounded-[2.7rem]">
                    <NavBar></NavBar>
                </div>
                <div className="w-screen">
                    <div className="">
                        <Header title={title} subTitle={subTitle}></Header>
                    </div>
                    <div className="h-[calc(100%-10rem)] flex flex-col">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Base;
