import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Script = () => {
    // Show Hide Sidebar
    const [showHideSidebar, setShowHideSidebar] = useState(true)

    // Sweetalert 2
    // Alert
    const handleAlert = (icon, title, message) => {
        Swal.fire({
            title: title,
            text: message,
            icon: icon
        })
    }

    return {
        showHideSidebar, setShowHideSidebar,
        handleAlert
    }
}

export default Script;