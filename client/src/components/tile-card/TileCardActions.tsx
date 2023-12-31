import { useSocket } from "@/app/socket-context2";
import { Button } from "../ui/button";
import PropertyActions from "./PropertyActions";
import { useAppSelector } from "@/app/hooks";
import { PurchasableTile, isProperty } from "@backend/types/Board";
import { selectPurchasableTileIndex } from "@/slices/ui-slice";
import { Separator } from "../ui/separator";
import { hasBuildings, isPlayerSuspended } from "@/utils";

type TileCardActionsProps = {
  tile: PurchasableTile;
};

const TileCardActions: React.FC<TileCardActionsProps> = ({ tile }) => {
  const socket = useSocket();
  const selectedTileIndex = useAppSelector(selectPurchasableTileIndex);
  const { currentPlayerTurnId } = useAppSelector((state) => state.game);

  const canSellProperty =
    currentPlayerTurnId === socket.id && !isPlayerSuspended(socket.id);
  const canSell = isProperty(tile)
    ? canSellProperty && !hasBuildings(tile.country.id)
    : canSellProperty;

  const sellPropertyHandler = () => {
    socket.emit("sell_property", {
      propertyIndex: selectedTileIndex,
    });
  };

  return (
    <div className="space-y-2">
      <Separator className="my-4" />
      {isProperty(tile) && <PropertyActions property={tile} />}
      <Button
        className="w-full"
        variant="destructive"
        disabled={!canSell}
        onClick={sellPropertyHandler}
      >
        מכור עבור ${tile.cost / 2}
      </Button>
    </div>
  );
};

export default TileCardActions;
