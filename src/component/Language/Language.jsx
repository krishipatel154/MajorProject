import { useParams } from "react-router-dom";

const Language = () => {
  const params = useParams();
  return <h1>Language {params.langname}</h1>;
};

export default Language;
