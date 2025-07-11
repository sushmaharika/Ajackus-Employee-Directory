'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Employee, EmployeeSchema, departments, roles } from '@/data/employees';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEmployeeContext } from '@/context/EmployeeContext';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

type EmployeeFormProps = {
  employee?: Employee;
  onClose: () => void;
};

export function EmployeeForm({ employee, onClose }: EmployeeFormProps) {
  const { dispatch } = useEmployeeContext();
  const { toast } = useToast();
  const form = useForm<Employee>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: employee || {
      id: `EMP${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      firstName: '',
      lastName: '',
      email: '',
      department: 'Engineering',
      role: 'Developer',
    },
  });

  const onSubmit = (data: Employee) => {
    if (employee) {
      dispatch({ type: 'UPDATE_EMPLOYEE', payload: data });
      toast({
        title: "Employee Updated",
        description: `${data.firstName} ${data.lastName} has been updated successfully.`,
      });
    } else {
      dispatch({ type: 'ADD_EMPLOYEE', payload: data });
      toast({
        title: "Employee Added",
        description: `${data.firstName} ${data.lastName} has been added successfully.`,
      });
    }
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-foreground">
          {employee ? 'Edit Employee' : 'Add Employee'}
        </h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@company.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{employee ? 'Update' : 'Add'} Employee</Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}