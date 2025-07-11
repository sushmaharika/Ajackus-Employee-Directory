'use client';

import { departments, roles } from '@/data/employees';
import { useEmployeeContext } from '@/context/EmployeeContext';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';

export function EmployeeFilters() {
  const { state, dispatch } = useEmployeeContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 p-4 bg-card rounded-lg shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium">Search</label>
          <Input
            placeholder="Search by name or email..."
            value={state.searchTerm}
            onChange={(e) =>
              dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Department</label>
          <Select
            value={state.departmentFilter}
            onValueChange={(value) =>
              dispatch({ type: 'SET_DEPARTMENT_FILTER', payload: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Role</label>
          <Select
            value={state.roleFilter}
            onValueChange={(value) =>
              dispatch({ type: 'SET_ROLE_FILTER', payload: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Roles</SelectItem>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  );
}