import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import SelectPlayer from "./SelectPlayer";
import TradeOffers from "./TradeOffers";
import TradeActions from "./TradeActions";
import { selectOffereePlayer, setInTrade } from "@/slices/trade-slice";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { X } from "lucide-react";

const Trade = () => {
  const dispatch = useAppDispatch();
  const { inTrade } = useAppSelector((state) => state.trade);
  const offeree = useAppSelector(selectOffereePlayer);

  return (
    <AlertDialog open={inTrade}>
      <AlertDialogTrigger asChild onClick={() => dispatch(setInTrade(true))}>
        <Button variant="primary">בצע עסקה</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rtl trade-dialog min-w-[500px] max-w-max">
        <AlertDialogHeader>
          {offeree ? (
            <AlertDialogTitle>
              בעסקה עם{" "}
              <span style={{ color: offeree.color }}>{offeree.name}</span>
            </AlertDialogTitle>
          ) : (
            <>
              <AlertDialogTitle>ביצוע עסקה</AlertDialogTitle>
              <AlertDialogDescription>
                בחר את השחקן שאיתו ברצונך לבצע עסקה
              </AlertDialogDescription>
            </>
          )}
        </AlertDialogHeader>
        {offeree ? (
          <>
            <TradeOffers />
            <TradeActions />
          </>
        ) : (
          <>
            <SelectPlayer />
            <AlertDialogCancel
              onClick={() => dispatch(setInTrade(false))}
              className="absolute left-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none p-0 border-none hover:bg-transparent h-auto"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </AlertDialogCancel>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Trade;
