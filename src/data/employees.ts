import type {StatusTone} from '../components/StatusPill';

export interface Employee {
  id: number;
  name: string;
  title: string;
  team: string;
  location: string;
  status: string;
  tone: StatusTone;
}

export const employees: Employee[] = [
  {id: 1, name: 'Amara Okafor', title: 'Staff Engineer', team: 'Platform', location: 'Dublin', status: 'Active', tone: 'positive'},
  {id: 2, name: 'Rin Takahashi', title: 'Product Designer', team: 'Design Systems', location: 'Tokyo', status: 'Active', tone: 'positive'},
  {id: 3, name: 'Diego Moreau', title: 'Engineering Manager', team: 'Payroll', location: 'Montréal', status: 'On leave', tone: 'caution'},
  {id: 4, name: 'Priya Raghunathan', title: 'Data Analyst', team: 'People Analytics', location: 'Bengaluru', status: 'Active', tone: 'positive'},
  {id: 5, name: 'Noor Haddad', title: 'Accessibility Lead', team: 'Design Systems', location: 'Amman', status: 'Active', tone: 'positive'},
  {id: 6, name: 'Tomás Lindqvist', title: 'QA Engineer', team: 'Platform', location: 'Stockholm', status: 'Contract ended', tone: 'critical'},
  {id: 7, name: 'Grace Mwangi', title: 'Technical Writer', team: 'Design Systems', location: 'Nairobi', status: 'Active', tone: 'positive'},
  {id: 8, name: 'Eli Rosenthal', title: 'Frontend Engineer', team: 'Payroll', location: 'Tel Aviv', status: 'Onboarding', tone: 'muted'},
  {id: 9, name: 'Wei Chen', title: 'Principal Architect', team: 'Platform', location: 'Singapore', status: 'Active', tone: 'positive'},
  {id: 10, name: 'Sofia Marchetti', title: 'Product Manager', team: 'People Analytics', location: 'Milan', status: 'On leave', tone: 'caution'},
  {id: 11, name: 'Kwame Asante', title: 'DevOps Engineer', team: 'Platform', location: 'Accra', status: 'Active', tone: 'positive'},
  {id: 12, name: 'Hanna Bakke', title: 'UX Researcher', team: 'Design Systems', location: 'Oslo', status: 'Active', tone: 'positive'},
];

export const teams = Array.from(new Set(employees.map(e => e.team))).sort();
