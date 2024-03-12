import LoadingOverlay from "react-loading-overlay-ts";
import { useSelector } from "react-redux";
import "./loader.css";
import styled, { css } from "styled-components";

const DarkBackground = styled.div<{ disappear: boolean }>`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  /* background-color: rgb(0, 0, 0); */
  ${(props) =>
    props.disappear &&
    css`
      display: block; /* show */
    `}
`;

/* Fallback color */
// background-color: rgb(0, 0, 0); 
 /* Black w/ opacity */
// background-color: rgba(0, 0, 0, 0.4);

function AppLoader() {
  const { loading } = useSelector((state: any) => state.AppReducer);
  return (
    <div>
      <DarkBackground disappear={loading}>
        <LoadingOverlay
          styles={{
            spinner: (base) => ({
              ...base,
              width: '40px',
              "& svg circle": {
                stroke: "#06bece",
              },
            }),
          }}
          className="bg-primary"
          active={true}
          spinner={true}
        ></LoadingOverlay>
      </DarkBackground>
    </div>
  );
}

export { AppLoader };
