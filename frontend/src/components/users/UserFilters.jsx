import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function UserFilters({ searchQuery, setSearchQuery, filterRole, setFilterRole }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Rechercher un utilisateur..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-xl"
        />
      </div>

      <Select value={filterRole} onValueChange={setFilterRole}>
        <SelectTrigger className="w-full sm:w-48 rounded-xl">
          <SelectValue placeholder="Filtrer par rôle" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les rôles</SelectItem>
          <SelectItem value="bibliothecaire">Bibliothécaires</SelectItem>
          <SelectItem value="enseignant">Enseignants</SelectItem>
          <SelectItem value="etudiant">Étudiants</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}