import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { IConfirmDialog } from "./type";

export function ConfirmDialog(props: IConfirmDialog) {
  const red: string = "rgb(220 38 38)"
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={props.variant}>{props.label}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent style={{ zIndex: 1000 }}>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {props.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter style={{ display: "flex", flexDirection: "row" }}>
          <AlertDialogAction style={{ color: red, backgroundColor: "transparent", width: "100%" }} onClick={props.onClickConfirm}>{props.labelOnConfirm}</AlertDialogAction>
          <AlertDialogCancel style={{ color: "white", backgroundColor: red, width: "100%" }}>{props.labelOnCancel}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
