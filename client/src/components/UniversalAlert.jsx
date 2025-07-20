import React from "react";
import { Alert as BootstrapAlert } from "react-bootstrap";
import { MdCheckCircle, MdErrorOutline, MdInfoOutline } from "react-icons/md";
import { Collapse } from "@mui/material";

const iconMap = {
  success: <MdCheckCircle size={24} className="me-2 text-success" />,
  error: <MdErrorOutline size={24} className="me-2 text-danger" />,
  info: <MdInfoOutline size={24} className="me-2 text-info" />,
};

const UniversalAlert = ({ variant = "info", children, show, onClose }) => {
  return (
    <Collapse in={show}>
      <BootstrapAlert
        variant={variant}
        dismissible={!!onClose}
        onClose={onClose}
        className="d-flex align-items-center shadow-sm rounded-4"
        style={{ fontWeight: 600, fontSize: "1rem" }}
      >
        {iconMap[variant]}
        {children}
      </BootstrapAlert>
    </Collapse>
  );
};

export default UniversalAlert;
