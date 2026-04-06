"use client";
import { useEffect } from "react";
import PropTypes from "prop-types";

export default function AdUnit({ slot, format = "auto", style = {} }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  if (!publisherId) return null;

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", ...style }}
      data-ad-client={publisherId}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}

AdUnit.propTypes = {
  slot: PropTypes.string.isRequired,
  format: PropTypes.string,
  style: PropTypes.object,
};
