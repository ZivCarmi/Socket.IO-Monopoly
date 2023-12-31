import store from "@/app/store";
import { MappedPlayersByTiles } from "@/types/Board";
import {
  CountryIds,
  GameTile,
  IProperty,
  RentIndexes,
  TileTypes,
  isProperty,
  isPurchasable,
} from "@backend/types/Board";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// create board that contains 10 tiles in a each row
export const createBoard = () => {
  const { board } = store.getState().game.map;
  const boardRows: GameTile[][] = [];
  let tempBoard: GameTile[] = [];

  board.forEach((tile) => {
    tempBoard.push(tile);

    if (tempBoard.length === board.length / 4) {
      boardRows.push(tempBoard);
      tempBoard = [];
    }
  });

  return boardRows;
};

export const mapPlayersOnBoard = () => {
  const { players } = store.getState().game;
  const initialMap: MappedPlayersByTiles = {};

  players.map((player) => {
    if (initialMap[player.tilePos] === undefined) {
      initialMap[player.tilePos] = [player];
    } else {
      initialMap[player.tilePos] = [...initialMap[player.tilePos], player];
    }
  });

  return initialMap;
};

export const isPlayerSuspended = (playerId: string) => {
  const suspendedPlayer = store.getState().game.suspendedPlayers[playerId];

  return Boolean(suspendedPlayer);
};

export const isPlayerInJail = (playerId: string) => {
  const suspendedPlayer = store.getState().game.suspendedPlayers[playerId];

  if (!suspendedPlayer) return false;

  return suspendedPlayer.reason === TileTypes.JAIL;
};

export const getCities = (countryId: CountryIds) => {
  const { board } = store.getState().game.map;

  return board.filter(
    (tile): tile is IProperty =>
      isProperty(tile) && tile.country.id === countryId
  );
};

export const hasBuildings = (countryId: CountryIds) => {
  return getCities(countryId).some(
    (city) => city.rentIndex !== RentIndexes.BLANK
  );
};

export const getPlayerPropertiesId = (ownerId: string) => {
  const { board } = store.getState().game.map;
  const propertiesId: number[] = [];

  for (let tileIndex = 0; tileIndex < board.length; tileIndex++) {
    const tile = board[tileIndex];

    if (isPurchasable(tile) && tile.owner === ownerId) {
      propertiesId.push(tileIndex);
    }
  }

  return propertiesId;
};

export const getPlayerColor = (playerId: string) => {
  const { players } = store.getState().game;
  const player = players.find((player) => player.id === playerId);

  return player?.color;
};
