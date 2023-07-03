import React from "react";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";

const Spinner = ({ loading }) => {
  const override = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <div className="spinner">
      <RingLoader color="#000" css={override} loading={loading} />
    </div>
  );
};

export default Spinner;
