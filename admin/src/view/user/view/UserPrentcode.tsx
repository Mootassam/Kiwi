import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserService from 'src/modules/user/userService';

function UserPrentcode({ code }) {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const findTheUserName = async (code) => {
    try {
      const response = await UserService.findParent(code);
      setData(response);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    findTheUserName(code);

    return () => {
      // Cleanup if necessary
    };
  }, [code]);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error: {error}</span>;

  return <span>{data}</span>;
}

UserPrentcode.propTypes = {
  code: PropTypes.string.isRequired,
};

export default UserPrentcode;
