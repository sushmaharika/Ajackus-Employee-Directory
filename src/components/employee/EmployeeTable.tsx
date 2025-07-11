'use client';

import { useState } from 'react';
import { Employee } from '@/data/employees';
import { useEmployeeContext } from '@/context/EmployeeContext';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { EmployeeForm } from './EmployeeForm';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

export function EmployeeTable() {
  const { state, dispatch } = useEmployeeContext();
  const { toast } = useToast();
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSort = (field: keyof Employee) => {
    const direction =
      state.sortField === field && state.sortDirection === 'asc' ? 'desc' : 'asc';
    dispatch({ type: 'SET_SORT', payload: { field, direction } });
  };

  const handleDelete = (id: string) => {
    const employee = state.employees.find(emp => emp.id === id);
    dispatch({ type: 'DELETE_EMPLOYEE', payload: id });
    toast({
      title: "Employee Deleted",
      description: `${employee?.firstName} ${employee?.lastName} has been deleted successfully.`,
    });
  };

  const handleEdit = (employee: Employee) => {
    setEditEmployee(employee);
    setIsDialogOpen(true);
  };

  const filteredEmployees = state.employees.filter((employee) => {
    const matchesSearch =
      employee.firstName.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(state.searchTerm.toLowerCase());

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
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort('id')}
            >
              Employee ID
              {state.sortField === 'id' && (
                <span>{state.sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort('firstName')}
            >
              First Name
              {state.sortField === 'firstName' && (
                <span>{state.sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort('lastName')}
            >
              Last Name
              {state.sortField === 'lastName' && (
                <span>{state.sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>
              )}
            </TableHead>
            <TableHead>Email</TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort('department')}
            >
              Department
              {state.sortField === 'department' && (
                <span>{state.sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort('role')}
            >
              Role
              {state.sortField === 'role' && (
                <span>{state.sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>
              )}
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {sortedEmployees.map((employee) => (
              <motion.tr
                key={employee.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
              >
                <TableCell className="font-mono text-sm">{employee.id}</TableCell>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        •••
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(employee)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(employee.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <EmployeeForm
            employee={editEmployee || undefined}
            onClose={() => {
              setIsDialogOpen(false);
              setEditEmployee(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}