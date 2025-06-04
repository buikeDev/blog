"use client";

import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function ThemeProvider({ children }) {
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (mounted) {
    return <div className={theme}>{children}</div>;
  }
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
