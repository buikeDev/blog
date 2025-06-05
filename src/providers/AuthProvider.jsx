"use client";

import React from "react";
import PropTypes from "prop-types";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.bubble.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // This ensures ReactQuill is only loaded on the client
});

export default function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
