import { useSocket } from "@/app/socket-context";
import { Footprints } from "lucide-react";
import { Button } from "../../ui/button";
import Icon from "../../ui/icon";

const BankruptcyButton = () => {
  const socket = useSocket();

  const bankruptcyHandler = () => {
    socket.emit("player_bankrupt");
  };

  return (
    <Button onClick={bankruptcyHandler} variant="destructive">
      <Icon icon={Footprints} />
      פשיטת רגל
    </Button>
  );
};
export default BankruptcyButton;
