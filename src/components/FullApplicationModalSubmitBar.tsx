
import React from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  agreed: boolean;
  handleSubmit: (e: React.FormEvent) => void;
};

export const FullApplicationModalSubmitBar: React.FC<Props> = ({
  agreed,
  handleSubmit,
}) => (
  <DialogFooter className="pt-4">
    <Button
      type="submit"
      className="w-full text-lg bg-blue-900 hover:bg-blue-800"
      disabled={!agreed}
      onClick={handleSubmit}
    >
      Submit Application
    </Button>
  </DialogFooter>
);
