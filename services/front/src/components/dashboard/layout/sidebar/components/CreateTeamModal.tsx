"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/client";
import { useRequiredSession } from "@/lib/auth/helpers/useRequiredSession";

export function CreateTeamModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [teamName, setTeamName] = React.useState("");
  const createTeam = trpc.auth.createTeam.useMutation();
  const { update } = useRequiredSession();

async function handleCreate() {
  if (!teamName.trim()) return;

  try {
    const newTeam = await createTeam.mutateAsync({ teamName });

    await update({ activeTeam: newTeam.teamId });

    setTeamName("");
    onOpenChange(false);
  } catch (err: any) {
    console.error("❌ Failed to create team:", err);
    alert(`Failed to create team: ${err.message ?? "Unknown error"}`);
  }
}


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new team</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Team name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={createTeam.isPending}>
            {createTeam.isPending ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
