import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <h1>Titan Forums</h1>
      <Link style={{ display: "block", margin: "1rem 0" }} to={`/`} key="home">
        Home
      </Link>
    </div>
  );
}
