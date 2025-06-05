"use client";

import React from "react";
import PropTypes from "prop-types";
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
