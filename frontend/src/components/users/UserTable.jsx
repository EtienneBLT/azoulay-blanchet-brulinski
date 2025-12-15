import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const roleLabels = {
  admin: "Administrateur",
  bibliothecaire: "Bibliothécaire",
  enseignant: "Enseignant",
  etudiant: "Étudiant"
};

const roleColors = {
  admin: "bg-purple-100 text-purple-800",
  bibliothecaire: "bg-blue-100 text-blue-800",
  enseignant: "bg-green-100 text-green-800",
  etudiant: "bg-gray-100 text-gray-800"
};

const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function UserTable({ users, isLoading, onEdit }) {
  return (
    <Card className="py-0 border-0 shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Utilisateur</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Rôle</TableHead>
                <TableHead className="font-semibold">Date de création</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-10 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  </TableRow>
                ))
              ) : users.length > 0 ? (
                <AnimatePresence>
                  {users.map((user) => {
                    const userRole = user.role;

                    return (
                      <TableRow key={user.id_utilisateur} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 border-2 border-gray-200">
                              <AvatarFallback className="bg-linear-to-br from-[#1e3a5f] to-[#2d5a8f] text-white">
                                {user.nom?.charAt(0) + user.prenom?.charAt(0) || "UP"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-[#1e3a5f]">{user.prenom + " " + user.nom}</p>
                              {user.id_utilisateur && (
                                <p className="text-xs text-gray-500">ID: {user.id_utilisateur}</p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600">{user.email}</TableCell>
                        <TableCell>
                          <Badge className={roleColors[userRole]}>
                            {roleLabels[userRole] || userRole}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">{formatDateTime(user.date_creation)}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(user)}
                            className="text-gray-500 hover:text-[#1e3a5f]"
                          >
                            <Pencil className="w-4 h-4 mr-1" />
                            Modifier
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </AnimatePresence>
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                    Aucun utilisateur trouvé
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}