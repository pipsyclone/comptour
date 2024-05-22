import { signOut } from "next-auth/react";
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

    // Confirmed Alert
    const handleConfirmLogoutAlert = (icon, title, text, cancelButton, buttonConfirmText) => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: cancelButton,
            confirmButtonText: buttonConfirmText
        })
            .then((result) => {
                if (result.isConfirmed) {
                    signOut()
                }
            })
    }

    return {
        showHideSidebar, setShowHideSidebar,
        handleAlert,
        handleConfirmLogoutAlert
    }
}

export default Script;