import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <Typography variant="h5" className="footer__logo">
        LearnVerse &copy; {new Date().getFullYear()}
      </Typography>
      <Typography variant="body2" className="footer__text">
        <Typography variant="h5" className="footer__title">
            Disclaimer
        </Typography>
        This website is developed for educational purposes. All content
        displayed on this website belongs to their respective owners and is used
        solely for educational and non-commercial purposes. We do not claim
        ownership over any copyrighted material. If you are a copyright holder
        and believe that your content has been used improperly, please{" "}
        <Link href="#" className="footer__link">
          contact us
        </Link>
        , and we will take appropriate action. This website does not engage in
        any commercial activities related to the displayed content.
      </Typography>
    </footer>
  );
};

export default Footer;
