import { useParams } from "react-router-dom";

export default function Thread() {
  let params = useParams();
  return <h2>Thread: {params.threadID}</h2>;
}
