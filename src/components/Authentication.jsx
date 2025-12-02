import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Authentication({ children, authentication }) {
  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authentication && status != authentication) {
      navigate("/login");
    } else if (!authentication && status != authentication) {
      navigate("/dashboard");
    }
    setLoading(false);
  }, [status]);
  return (
    <div>
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <span className="loading loading-ring loading-xl"></span>
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export default Authentication;
