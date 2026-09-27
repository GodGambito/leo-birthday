export interface Contributor {
  id: string;
  name: string;
  normalized_name: string;
  total_amount: number;
  contribution_count: number;
  last_contribution_at: string;
  created_at: string;
  last_message?: string;
}

export interface Contribution {
  id: string;
  contributor_id: string;
  contributor_name: string;
  amount: number;
  message?: string;
  created_at: string;
}

export interface SummaryData {
  contributors: Contributor[];
  totalRaised: number;
  goalAmount: number;
  percentage: number;
  contributorCount: number;
  recentContributions: Contribution[];
}
