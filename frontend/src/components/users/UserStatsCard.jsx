import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck } from "lucide-react";

export default function UserStatsCards({ totalUsers, totalLibrarians, totalTeachers, totalStudents }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1e3a5f]">{totalUsers}</p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1e3a5f]">{totalLibrarians}</p>
              <p className="text-xs text-gray-500">Bibliothécaires</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1e3a5f]">{totalTeachers}</p>
              <p className="text-xs text-gray-500">Enseignants</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1e3a5f]">{totalStudents}</p>
              <p className="text-xs text-gray-500">Étudiants</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}