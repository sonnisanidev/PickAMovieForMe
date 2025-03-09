import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message }) => (
  <div className="text-red-500 text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
    <p className="font-medium">{message}</p>
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
