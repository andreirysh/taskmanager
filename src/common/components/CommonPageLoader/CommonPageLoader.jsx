import { ClipLoader } from "react-spinners";
import React from "react";

export const CommonPageLoader = () => {
    return (
        <div className="spinner-container">
            <div className="spinner">
                <ClipLoader color="#007bff" loading={true} size={100} />
            </div>
        </div>
    )
}