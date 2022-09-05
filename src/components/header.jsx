import { useLocation } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Header() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div>
      <h1>Titan Forums</h1>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Threads
        </Link>
        {pathnames.map((value, index) => {
          console.log(`${value} - ${index}`);
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return last ? (
            <Typography color="text.primary" key={to}>
              {value}
            </Typography>
          ) : (
            <Link underline="hover" color="inherit" href={to} key={to}>
              {value}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
