import React, { useState } from "react";
import { format } from "date-fns";
import { cs, enUS } from "date-fns/locale";
import { GratitudeEntry, Category } from "../types";
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import GratitudeForm from "./GratitudeForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabaseService } from "@/lib/supabaseService";
import { useToast } from "@/hooks/use-toast";

interface EntryCardProps {
  entry: GratitudeEntry;
  onUpdate?: () => void;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry, onUpdate }) => {
  const { language, t } = useLanguage();
  const { toast } = useToast();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const getCategoryEmoji = (categoryId: Category): string => {
    const categoryMap: Record<Category, string> = {
      "gratitude": "♥️",
      "self-admiration": "✨",
      "self-appreciation": "🌟",
      "others-admiration": "👏",
    };

    return categoryMap[categoryId];
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) {
      console.error("Invalid date string:", dateString);
      return "";
    }

    const date = new Date(dateString);
    return format(date, "PPP", { locale: language === "cs" ? cs : enUS });
  };

  const handleDelete = async () => {
    try {
      await supabaseService.deleteEntry(entry.id);

      toast({ title: t("common.success"), description: "Záznam byl smazán" });

      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Error deleting entry:", error);
      toast({
        title: t("common.error"),
        description: "Nepodařilo se smazat záznam",
        variant: "destructive",
      });
    }

    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <Card className="mb-4">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center">
            <span className="text-xl mr-2">{getCategoryEmoji(entry.category)}</span>
            {/* <span className="text-muted-foreground text-sm"></span> */}
            <span className="text-muted-foreground text-sm">{formatDate(entry.created_at)}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-base whitespace-pre-wrap">{entry.content}</p>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2 pt-0">
          <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
            {t("common.edit")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            {t("common.delete")}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <GratitudeForm
            entry={entry}
            isEdit={true}
            onComplete={() => {
              setIsEditDialogOpen(false);
              if (onUpdate) onUpdate();
            }}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("common.delete")}</AlertDialogTitle>
            <AlertDialogDescription>
              Opravdu chcete smazat tento záznam? Tuto akci nelze vrátit zpět.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t("common.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EntryCard;
