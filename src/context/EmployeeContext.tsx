'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Employee, mockEmployees } from '@/data/employees';

type State = {
  employees: Employee[];
  filteredEmployees: Employee[];
  searchTerm: string;
  departmentFilter: string;
  roleFilter: string;
  sortField: keyof Employee | null;
  sortDirection: 'asc' | 'desc';
};

type Action =
  | { type: 'ADD_EMPLOYEE'; payload: Employee }
  | { type: 'UPDATE_EMPLOYEE'; payload: Employee }
  | { type: 'DELETE_EMPLOYEE'; payload: string }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_DEPARTMENT_FILTER'; payload: string }
  | { type: 'SET_ROLE_FILTER'; payload: string }
  | { type: 'SET_SORT'; payload: { field: keyof Employee; direction: 'asc' | 'desc' } };

const initialState: State = {
  employees: mockEmployees,
  filteredEmployees: mockEmployees,
  searchTerm: '',
  departmentFilter: '',
  roleFilter: '',
  sortField: null,
  sortDirection: 'asc',
};

const employeeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_EMPLOYEE':
      return {
        ...state,
        employees: [...state.employees, action.payload],
        filteredEmployees: [...state.employees, action.payload],
      };
    case 'UPDATE_EMPLOYEE':
      const updatedEmployees = state.employees.map((emp) =>
        emp.id === action.payload.id ? action.payload : emp
      );
      return {
        ...state,
        employees: updatedEmployees,
        filteredEmployees: updatedEmployees,
      };
    case 'DELETE_EMPLOYEE':
      const remainingEmployees = state.employees.filter((emp) => emp.id !== action.payload);
      return {
        ...state,
        employees: remainingEmployees,
        filteredEmployees: remainingEmployees,
      };
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      };
    case 'SET_DEPARTMENT_FILTER':
      return {
        ...state,
        departmentFilter: action.payload,
      };
    case 'SET_ROLE_FILTER':
      return {
        ...state,
        roleFilter: action.payload,
      };
    case 'SET_SORT':
      return {
        ...state,
        sortField: action.payload.field,
        sortDirection: action.payload.direction,
      };
    default:
      return state;
  }
};

type EmployeeContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  return (
    <EmployeeContext.Provider value={{ state, dispatch }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployeeContext must be used within an EmployeeProvider');
  }
  return context;
};