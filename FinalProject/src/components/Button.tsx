/** @format */
import ButtonMU from "@mui/material/Button";

type Props = {
  label: string;
  onClick?: () => unknown;
  type?: "submit" | "button";
};
const Button = ({ label, type = "submit", onClick = () => {} }: Props) => (
  <ButtonMU
    variant="contained"
    disableElevation
    type={type}
    onClick={onClick}
    style={{ marginTop: "20px" }}
  >
    {label}
  </ButtonMU>
);

export default Button;
