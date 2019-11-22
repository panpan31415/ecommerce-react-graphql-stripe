import React from "react";
import { Toast, Box } from "gestalt";

const ToastMessage = ({ msg }) =>
  msg.length > 0 ? (
    <Box
      position="fixed"
      dangerouslySetInlineStyle={{
        __style: {
          top: 400,
          left: "50%",
          transform: "translateX(-50%)",
        },
      }}
    >
      <Toast color="orange" text={msg} />
    </Box>
  ) : null;

export default ToastMessage;
