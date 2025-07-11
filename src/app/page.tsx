'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { EmployeeTable } from '@/components/employee/EmployeeTable';
import { EmployeeCard } from '@/components/employee/EmployeeCard';
import { EmployeeForm } from '@/components/employee/EmployeeForm';
import { EmployeeFilters } from '@/components/employee/EmployeeFilters';
import { EmployeeProvider, useEmployeeContext } from '@/context/EmployeeContext';
import { ThemeToggle } from '@/components/theme-toggle';
import { Toaster } from '@/components/ui/toaster';
import { motion } from 'framer-motion';
import { Grid3X3, List, Plus } from 'lucide-react';

type ViewMode = 'table' | 'card';

function EmployeeView() {
  const { state } = useEmployeeContext();
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  const filteredEmployees = state.employees.filter((employee) => {
    const matchesSearch =
      employee.firstName.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(state.searchTerm.toLowerCase());

    const matchesDepartment =
      !state.departmentFilter || employee.department === state.departmentFilter;

    const matchesRole = !state.roleFilter || employee.role === state.roleFilter;

    return matchesSearch && matchesDepartment && matchesRole;
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (!state.sortField) return 0;
    const aValue = a[state.sortField];
    const bValue = b[state.sortField];
    return state.sortDirection === 'asc'
      ? aValue > bValue
        ? 1
        : -1
      : aValue < bValue
      ? 1
      : -1;
  });

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
            className="flex items-center space-x-2"
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">Table View</span>
          </Button>
          <Button
            variant={viewMode === 'card' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('card')}
            className="flex items-center space-x-2"
          >
            <Grid3X3 className="h-4 w-4" />
            <span className="hidden sm:inline">Card View</span>
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {sortedEmployees.length} employee{sortedEmployees.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Content */}
      {viewMode === 'table' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="rounded-lg border bg-card shadow-sm"
        >
          <EmployeeTable />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {sortedEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <EmployeeProvider>
      <main className="container mx-auto py-8 space-y-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Employee Directory
            </h1>
            <p className="text-muted-foreground">Employee Directory</p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent>
                <EmployeeForm onClose={() => setIsDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        <EmployeeFilters />

        <EmployeeView />
      </main>
      <Toaster />
    </EmployeeProvider>
  );
}