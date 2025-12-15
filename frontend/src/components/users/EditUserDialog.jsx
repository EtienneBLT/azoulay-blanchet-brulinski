import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserCheck, Mail } from "lucide-react";

export default function EditUserDialog({
  open,
  onOpenChange,
  selectedUser,
  formData,
  setFormData,
  onSubmit,
  isPending
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Modifier l'utilisateur</DialogTitle>
          <DialogDescription>
            Modifier les informations de {selectedUser?.prenom + " " + selectedUser?.nom}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border-2 border-[#d4af37]">
                <AvatarFallback className="bg-linear-to-br from-[#1e3a5f] to-[#2d5a8f] text-white">
                  {selectedUser?.prenom?.charAt(0) + selectedUser?.nom?.charAt(0) || "AZ"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-[#1e3a5f]">{selectedUser?.prenom + " " + selectedUser?.nom}</p>
                <p className="text-sm text-gray-600">{selectedUser?.email}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="user_role" className="flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                Rôle
              </Label>
              <Select
                value={formData.user_role}
                onValueChange={(value) => setFormData({ ...formData, user_role: value })}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bibliothecaire">Bibliothécaire</SelectItem>
                  <SelectItem value="enseignant">Enseignant</SelectItem>
                  <SelectItem value="etudiant">Étudiant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="student_id" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Adresse e-mail
              </Label>
              <Input
                id="id_utilisateur"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="prenom.nom@univ.fr"
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prenom" className="flex items-center gap-2">
                Prénom
              </Label>
              <Input
                id="prenom"
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                placeholder="Prénom de l'utilisateur"
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nom" className="flex items-center gap-2">
                Nom
              </Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                placeholder="Nom de l'utilisateur"
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mot_de_passe">Mot de passe (optionnel)</Label>
              <Input
                id="mot_de_passe"
                type="password"
                value={formData.mot_de_passe}
                onChange={(e) => setFormData({ ...formData, mot_de_passe: e.target.value })}
                placeholder="Nouveau mot de passe"
                className="rounded-xl"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-linear-to-r from-[#1e3a5f] to-[#2d5a8f]"
            >
              {isPending ? "Enregistrement..." : "Enregistrer les modifications"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}