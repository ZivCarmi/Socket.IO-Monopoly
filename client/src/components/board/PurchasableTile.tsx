import { PurchasableTile, RentIndexes, isProperty } from "@backend/types/Board";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import TileCard from "../tile-card/TileCard";
import { useAppDispatch } from "@/app/hooks";
import { setSelectedTile } from "@/slices/ui-slice";
import TileBody from "./TileBody";
import TileContent from "./TileContent";
import { Home, Hotel } from "lucide-react";
import CityBuilding from "./CityBuilding";
import CityFlagIcon from "./CityFlagIcon";
import OwnerIndicator from "./OwnerIndicator";

type PurchasableTileProps = {
  tile: PurchasableTile;
};

const PurchasableTile: React.FC<PurchasableTileProps> = ({ tile }) => {
  const dispatch = useAppDispatch();
  const cityHasHouses =
    isProperty(tile) &&
    tile.rentIndex !== RentIndexes.BLANK &&
    tile.rentIndex !== RentIndexes.HOTEL;
  const cityHasHotel = isProperty(tile) && tile.rentIndex === RentIndexes.HOTEL;

  return (
    <Popover>
      <PopoverTrigger
        onClick={() => dispatch(setSelectedTile(tile))}
        className="w-full h-full"
      >
        <TileContent className="justify-between gap-1">
          <TileBody>{tile.name}</TileBody>
          {tile.owner && (
            <OwnerIndicator ownerId={tile.owner}>
              {cityHasHotel && <CityBuilding icon={Hotel} />}
              {cityHasHouses && (
                <CityBuilding icon={Home} count={tile.rentIndex} />
              )}
            </OwnerIndicator>
          )}
          {isProperty(tile) && <CityFlagIcon countryId={tile.country.id} />}
        </TileContent>
      </PopoverTrigger>
      <PopoverContent>
        <TileCard />
      </PopoverContent>
    </Popover>
  );
};

export default PurchasableTile;
