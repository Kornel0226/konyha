import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/receptek");
  }, [navigate]);

  return <div></div>;
};

export default Start;
