import { z } from 'zod';

export const EmployeeSchema = z.object({
  id: z.string(),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  department: z.enum(['Engineering', 'Marketing', 'Sales', 'HR', 'Finance']),
  role: z.enum(['Developer', 'Designer', 'Manager', 'Director', 'Analyst', 'Coordinator']),
});

export type Employee = z.infer<typeof EmployeeSchema>;

export const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'] as const;
export const roles = ['Developer', 'Designer', 'Manager', 'Director', 'Analyst', 'Coordinator'] as const;

export const mockEmployees: Employee[] = [
  {
    id: 'EMP001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    department: 'Engineering',
    role: 'Developer',
  },
  {
    id: 'EMP002',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@company.com',
    department: 'Marketing',
    role: 'Manager',
  },
  {
    id: 'EMP003',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@company.com',
    department: 'Sales',
    role: 'Director',
  },
  {
    id: 'EMP004',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.williams@company.com',
    department: 'HR',
    role: 'Coordinator',
  },
  {
    id: 'EMP005',
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@company.com',
    department: 'Finance',
    role: 'Analyst',
  },
  {
    id: 'EMP006',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@company.com',
    department: 'Engineering',
    role: 'Designer',
  },
  {
    id: 'EMP007',
    firstName: 'Robert',
    lastName: 'Miller',
    email: 'robert.miller@company.com',
    department: 'Marketing',
    role: 'Analyst',
  },
  {
    id: 'EMP008',
    firstName: 'Lisa',
    lastName: 'Wilson',
    email: 'lisa.wilson@company.com',
    department: 'Sales',
    role: 'Manager',
  },
  {
    id: 'EMP009',
    firstName: 'James',
    lastName: 'Taylor',
    email: 'james.taylor@company.com',
    department: 'Engineering',
    role: 'Developer',
  },
  {
    id: 'EMP010',
    firstName: 'Amanda',
    lastName: 'Anderson',
    email: 'amanda.anderson@company.com',
    department: 'Finance',
    role: 'Director',
  },
  {
    id: 'EMP011',
    firstName: 'Christopher',
    lastName: 'Thomas',
    email: 'christopher.thomas@company.com',
    department: 'HR',
    role: 'Manager',
  },
  {
    id: 'EMP012',
    firstName: 'Jessica',
    lastName: 'Jackson',
    email: 'jessica.jackson@company.com',
    department: 'Marketing',
    role: 'Designer',
  },
];