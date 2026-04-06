import React from "react";
import Featured from "../components/featured/Featured";
import styles from "./homepage.module.css";
import CategoryList from "../components/categoryList/CategoryList";
import CardList from "../components/cardList/CardList";
import Menu from "../components/menu/Menu";
import AdUnit from "../components/ads/AdUnit";
import PropTypes from "prop-types";

export default async function Home(props) {
  const { searchParams } = await props;
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.continer}>
      <Featured />
      <CategoryList />
      <AdUnit
        slot={process.env.NEXT_PUBLIC_ADSENSE_BANNER_SLOT || ""}
        format="horizontal"
        style={{ minHeight: 90 }}
      />
      <div className={styles.content}>
        <CardList page={page} />
        <Menu />
      </div>
    </div>
  );
}

Home.propTypes = {
  searchParams: PropTypes.shape({
    page: PropTypes.string,
  }).isRequired,
};
