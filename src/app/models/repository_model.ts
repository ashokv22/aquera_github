export interface Repository {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    language: string;
    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
    owner: {
      login: string;
      avatar_url: string;
      html_url: string;
    };
}

export interface RepositoryList {
    // totalCount: number;
    data: Repository[];
    nextPageUrl: string;
    prevPageUrl: string;
}