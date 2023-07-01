import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

type ModalProps = {
  icon: any;
  title: string;
  onClose: () => void;
  onConfirmAction: (parmas: any) => Promise<any> | void;
  textConfirmButton?: string;
};

const CustomModal = ({
  icon,
  title,
  onClose,
  onConfirmAction,
  textConfirmButton = "Aceptar",
}: ModalProps) => {
  return (
    <Box
      height="100%"
      width="100%"
      position="fixed"
      zIndex="10000"
      sx={{
        top: "0",
        left: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "rgba(0,0,255,0.3)",
      }}
    >
      <Box
        sx={{
          bgcolor: "common.white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 580,
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          pt: 6,
          pb: 7,
          px: { xs: 2, sm: 10 },
          mx: 3,
        }}
      >
        <Box
          sx={{
            width: 100,
            height: 100,
            bgcolor: "#FFE8EC",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 60,
            color: "secondary.main",
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="h2"
          sx={{
            mt: 3,
            color: "common.black",
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 5 }}>
          <Button variant="text" sx={{ color: "#1A75FF" }} onClick={onClose}>
            Cancelar
          </Button>
          <Button color="secondary" onClick={onConfirmAction}>
            {textConfirmButton}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomModal;
