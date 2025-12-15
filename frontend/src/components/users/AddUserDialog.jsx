import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Mail, Users, UserCheck, Send } from "lucide-react";
import { motion } from "framer-motion";

const roleLabels = {
  bibliothecaire: "Bibliothécaire",
  enseignant: "Enseignant",
  etudiant: "Étudiant"
};

export default function AddUserDialog({
  open,
  onOpenChange,
  addData,
  setAddData,
  onSubmit,
  isPending,
  isSuccess,
  isError
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="add_email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Adresse e-mail *
              </Label>
              <Input
                id="add_email"
                type="email"
                value={addData.email}
                onChange={(e) => setAddData({ ...addData, email: e.target.value })}
                placeholder="prenom.nom@univ.fr"
                className="rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="add_role" className="flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                Rôle *
              </Label>
              <Select
                value={addData.user_role}
                onValueChange={(value) => setAddData({ ...addData, user_role: value })}
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
              <Label htmlFor="add_prenom" className="flex items-center gap-2">
                Prenom *
              </Label>
              <Input
                id="add_prenom"
                value={addData.prenom}
                onChange={(e) => setAddData({ ...addData, prenom: e.target.value })}
                placeholder="Prénom de l'utilisateur"
                className="rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="add_nom" className="flex items-center gap-2">
                Nom *
              </Label>
              <Input
                id="add_nom"
                value={addData.nom}
                onChange={(e) => setAddData({ ...addData, nom: e.target.value })}
                placeholder="Nom de l'utilisateur"
                className="rounded-xl"
                required
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="add_message">Message personnel (optionnel)</Label>
              <Textarea
                id="add_message"
                value={addData.message}
                onChange={(e) => setAddData({ ...addData, message: e.target.value })}
                placeholder="Ajoutez un message de bienvenue personnalisé..."
                className="rounded-xl h-24"
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium text-sm text-gray-900 mb-2">Aperçu de l'invitation</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Destinataire :</strong> {addData.email || "(aucune adresse)"}</p>
              <p><strong>Nom :</strong> {addData.nom || "(aucun nom)"}</p>
              <p><strong>Rôle :</strong> {roleLabels[addData.user_role]}</p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isPending || !addData.email || !addData.nom}
              className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8f]"
            >
              {isPending ? (
                <>
                  <Send className="w-4 h-4 mr-2 animate-pulse" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer l'invitation
                </>
              )}
            </Button>
          </DialogFooter>

          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm"
            >
              ✓ L'invitation a été envoyée avec succès à {addData.email}
            </motion.div>
          )}

          {isError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm"
            >
              ✗ Erreur lors de l'envoi de l'invitation
            </motion.div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}