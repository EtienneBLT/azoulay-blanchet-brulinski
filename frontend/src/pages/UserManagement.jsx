import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createApiUrl } from "@/lib/utils";
import UserStatsCards from "@/components/users/UserStatsCard";
import UserFilters from "@/components/users/UserFilters";
import UserTable from "@/components/users/UserTable";
import AddUserDialog from "@/components/users/AddUserDialog";
import EditUserDialog from "@/components/users/EditUserDialog";

export default function UserManagement() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterRole, setFilterRole] = useState("all");
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        user_role: "",
        mot_de_passe: ""
    });

    const [addData, setAddData] = useState({
        nom: "",
        prenom: "",
        email: "",
        user_role: "",
        mot_de_passe: ""
    });

    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axios.get(createApiUrl("Users"));
            return res.data;
        },
    });

    const openEditDialog = (user) => {
        setSelectedUser(user);
        setFormData({
            nom: user.nom || "",
            prenom: user.prenom || "",
            email: user.email || "",
            user_role: user.role || "etudiant"
        });
        setEditDialogOpen(true);
    };

    const closeDialog = () => {
        setEditDialogOpen(false);
        setSelectedUser(null);
    };

    const openAddDialog = () => {
        setAddData({
            email: "",
            full_name: "",
            user_role: "etudiant",
            message: ""
        });
        setAddDialogOpen(true);
    };

    const closeAddDialog = () => {
        setAddDialogOpen(false);
        setAddData({
            email: "",
            full_name: "",
            user_role: "etudiant",
            message: ""
        });
    };

    const filteredUsers = users.filter(user => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = !searchQuery ||
            String(user.id_utilisateur).toLowerCase().includes(searchLower) ||
            user.nom?.toLowerCase().includes(searchLower) ||
            user.prenom?.toLowerCase().includes(searchLower) ||
            user.email?.toLowerCase().includes(searchLower);

        const userRole = user.role;
        const matchesRole = filterRole === "all" || userRole === filterRole;

        return matchesSearch && matchesRole;
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
                    onClick={() => setAddDialogOpen(true)}
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

            <UserFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filterRole={filterRole}
                setFilterRole={setFilterRole}
            />

            <UserTable
                users={filteredUsers}
                isLoading={isLoading}
                onEdit={openEditDialog}
            />

            <EditUserDialog
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
                selectedUser={selectedUser}
                formData={formData}
                setFormData={setFormData}
            />

            <AddUserDialog
                open={addDialogOpen}
                onOpenChange={setAddDialogOpen}
                addData={addData}
                setAddData={setAddData}
            />
        </div>
    );
}