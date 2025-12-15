import React from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createApiUrl } from "@/lib/utils";
import UserStatsCards from "@/components/users/UserStatsCard";

export default function UserManagement() {
    const { data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axios.get(createApiUrl("Users"));
            return res.data;
        },
    });

    const totalUsers = users.length;
    const totalLibrarians = users.filter(u => u.role === "bibliothecaire").length;
    const totalTeachers = users.filter(u => u.role === "enseignant").length;
    const totalStudents = users.filter(u => u.role === "etudiant").length;

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#1e3a5f]">Gestion des Utilisateurs</h1>
                    <p className="text-gray-500 mt-1">{totalUsers} utilisateur(s) enregistré(s)</p>
                </div>
                <Button
                    className="bg-linear-to-r from-[#1e3a5f] to-[#2d5a8f] hover:from-[#2d5a8f] hover:to-[#1e3a5f]"
                >
                    <UserPlus className="w-4 h-4" />
                    Ajouter un utilisateur
                </Button>
            </div>

            <UserStatsCards
                totalUsers={totalUsers}
                totalLibrarians={totalLibrarians}
                totalTeachers={totalTeachers}
                totalStudents={totalStudents}
            />
        </div>
    );
}